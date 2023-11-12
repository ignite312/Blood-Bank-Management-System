const oracledb = require('oracledb');

const dbConfig = {
  user: 's2020015640',
  password: 'db2023',
  connectString: '103.221.254.51:1521/pdbdbms2023.cse.du.ac.bd',
};

async function run() {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Perform database operations here

    const result = await connection.execute('SELECT * FROM donor');

    console.log(result.rows);

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

run();



