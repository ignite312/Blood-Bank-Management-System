const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');

const app = express();
const port = 3000;

const dbConfig = {
  user: 's2020015640',
  password: 'db2023',
  connectString: '103.221.254.51:1521/pdbdbms2023.cse.du.ac.bd',
};

// Use the cors middleware to allow requests from a specific origin (e.g., http://localhost:3001)
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json()); // Middleware to parse JSON request bodies

// Route to fetch data from Oracle
app.get('/api/data-from-oracle', async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    // Execute an example query to fetch data from an Oracle table
    const result = await connection.execute('SELECT * FROM donor');
    
    res.json(result.rows);

    // Release the connection
    await connection.close();
  } catch (err) {
    console.error('Error fetching data from Oracle:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route to insert data into Oracle
app.post('/api/insert-data', async (req, res) => {
  try {
    const { id, firstName, lastName, phone, bloodType, location, email, donationCount } = req.body;

    // Ensure all required fields are present
    if (!id || !firstName || !lastName || !phone || !bloodType || !location || !email || !donationCount) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const connection = await oracledb.getConnection(dbConfig);

    // Example query for data insertion (modify according to your database schema)
    const query = `
    INSERT INTO donor (DONORID, FIRSTNAME, LASTNAME, PHONENUMBER, BLOODGROUP, LOCATION, EMAIL, TOTALDONATIONCOUNT)
    VALUES (:id, :firstName, :lastName, :phone, :bloodType, :location, :email, :donationCount)
    `;

    const bindParams = {
      id,
      firstName,
      lastName,
      phone,
      bloodType,
      location,
      email,
      donationCount,
    };

    const result = await connection.execute(query, bindParams, { autoCommit: true });

    res.status(200).json({ success: true, message: 'Data successfully inserted into the database' });

    // Release the connection
    await connection.close();
  } catch (error) {
    console.error('Error inserting data into the database:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
