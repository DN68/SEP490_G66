const mysql = require('mysql2');
var connection;
try {
  connection = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12654961',
    password: 'QhPc3Yxkkc',
    database: 'sql12654961',
    port: 3306,
  });
  console.log('Connect DB success')


} catch (e) { console.log(e + 'Connect Fails'); }

module.exports = connection;
