const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

// Configure your Oracle database connection details
const dbConfig = {
  user: 's2020015640',
  password: 'db2023',
  connectString: '103.221.254.51:1521/pdbdbms2023.cse.du.ac.bd',
};

// Use the cors middleware to allow requests from a specific origin (e.g., http://localhost:3001)
app.use(cors({ origin: 'http://localhost:3001' }));

app.get('/api/data-from-oracle', (req, res) => {
  oracledb.getConnection(dbConfig, (err, connection) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error connecting to Oracle database');
      return;
    }

    // Execute an example query to fetch data from an Oracle table
    connection.execute(
      'SELECT * FROM donor',
      (err, result) => {
        if (err) {
          console.error(err.message);
          res.status(500).send('Error fetching data from Oracle');
        } else {
          res.json(result.rows);
        }

        // Release the connection
        connection.close((err) => {
          if (err) {
            console.error(err.message);
          }
        });
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
