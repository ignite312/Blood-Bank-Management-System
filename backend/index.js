import oracledb from 'oracledb';
import express from 'express'
// const oracledb = require('oracledb');
const app = express();

//   let connection;

 
//     connection = await oracledb.getConnection({
//       user: 's2020015640',
//       password: 'db2023',
      // connectString: '103.2.254.51:1521/pdbdbms2023.cse.du.ac.bd', // Format: host:port/service_name or host:port/SID
//     });

//     // Check if the connection is successful
//     if (connection) {
//       console.log('Connected to Oracle Database');
      
//       // Create a table
//       // await connection.execute(
//       //   `CREATE TABLE lab707 (
//       //     id NUMBER PRIMARY KEY,
//       //     name VARCHAR2(50),
//       //     age NUMBER
//       //   )`
//       // );
//       // console.log('Table "lab707" created successfully.');

//       // Perform other database operations here
//       // const result = await connection.execute('SELECT * FROM lab707');
//       console.log(result.rows);
//     } else {
//       console.error('Failed to connect to Oracle Database');
//     }
//
app.listen(8800, () => {
  console.log('Server connected');
});

const dbConfig = {
  user: 's2020015640',
  password: 'db2023',
  connectString: '103.2.254.51:1521/pdbdbms2023.cse.du.ac.bd', // Format: host:port/service_name or host:port/SID
};
console.log('Hellos');

oracledb.getConnection(dbConfig, (err, connection) => {
  if (err) {
    console.error('Error connecting to Oracle:', err);
    return;
  }

  // Connection successful - you can now execute SQL queries here

  // Define the SQL statement to create a table
  const createTableSql = `
    CREATE TABLE sample_table (
      id NUMBER,
      name VARCHAR2(50),
      age NUMBER
    )
  `;

  connection.execute(createTableSql, (createTableErr, result) => {
    if (createTableErr) {
      console.error('Error creating table:', createTableErr);
    } else {
      console.log('Table created successfully');
    }

    // Release the connection when done
    connection.release((releaseErr) => {
      if (releaseErr) {
        console.error('Error releasing the Oracle connection:', releaseErr);
      }
    });
  });
});

app.get('/', (req, res) => {
  res.json('Hello from database');
});