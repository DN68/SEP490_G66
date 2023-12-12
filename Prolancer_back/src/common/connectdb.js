const mysql = require('mysql2');
var connection;
require('dotenv').config();
try {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    port: process.env.DB_PORT,
    // connectionLimit : 100
  });
  console.log('Connect DB success')

  
} catch (e) { console.log(e + 'Connect Fails'); }

module.exports = connection;
// host: 'plc-mysql-server66.mysql.database.azure.com',
// user: 'plc_admin',
// password: 'QhPc3Yxkkc',
// database: 'mysql',
// port: 3306,
// connectionLimit : 100