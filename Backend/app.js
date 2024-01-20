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
    const result = await connection.execute('SELECT * FROM PERSON');
    
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
    const { person_id, full_name, age, gender, address, blood_group, phone_number, email, is_public_donor } = req.body;

    // Ensure all required fields are present
    if (!person_id || !full_name || !age || !gender || !address || !blood_group || !phone_number || !email || !is_public_donor) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const connection = await oracledb.getConnection(dbConfig);

    // Example query for data insertion (modify according to your database schema)
    const query = `
    INSERT INTO Person (person_id, full_name, age, gender, address, blood_group, phone_number, email, is_public_donor)
    VALUES (:person_id, :full_name, :age, :gender, :address, :blood_group, :phone_number, :email, :is_public_donor)
    `;

    const bindParams = {
      person_id,
      full_name,
      age,
      gender,
      address,
      blood_group,
      phone_number,
      email,
      is_public_donor,
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

app.post('/api/insert-request', async (req, res) => {
  try {
    const { patient_id, quantity, blood_group, hospital_name } = req.body;

    if (!patient_id || !quantity || !blood_group || !hospital_name) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const connection = await oracledb.getConnection(dbConfig);

    // Automatically generate request_id based on the current date and time
    const request_id = generateRequestId();
    
    const query = `
      INSERT INTO Request (request_id, patient_id, request_date, quantity, status, blood_group, hospital_name)
      VALUES (:request_id, :patient_id, SYSDATE, :quantity, 'Pending', :blood_group, :hospital_name)
    `;

    const bindParams = {
      request_id,
      patient_id,
      quantity,
      blood_group,
      hospital_name,
    };

    const result = await connection.execute(query, bindParams, { autoCommit: true });

    res.status(200).json({ success: true, message: 'Request data successfully inserted into the database' });

    // Release the connection
    await connection.close();
  } catch (error) {
    console.error('Error inserting request data into the database:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

function generateRequestId() {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear().toString().slice(-2);
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');

  return `${day}${month}${year}${hours}${minutes}${seconds}`;
}

// Route to insert data into the Appointment table
app.post('/api/create-appointment', async (req, res) => {
  try {
    const { donor_id } = req.body;

    // Ensure donor_id is present
    if (!donor_id) {
      return res.status(400).json({ success: false, message: 'Donor ID is required' });
    }

    const connection = await oracledb.getConnection(dbConfig);

    // Automatically generate appointment_id based on the current date and time
    const appointment_id = generateRequestId();

    const query = `
      INSERT INTO Appointment (appointment_id, donor_id, appointment_date, status)
      VALUES (:appointment_id, :donor_id, SYSDATE, 'Pending')
    `;

    const bindParams = {
      appointment_id,
      donor_id,
    };

    const result = await connection.execute(query, bindParams, { autoCommit: true });

    res.status(200).json({ success: true, message: 'Appointment data successfully inserted into the database' });

    await connection.close();
  } catch (error) {
    console.error('Error inserting appointment data into the database:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
