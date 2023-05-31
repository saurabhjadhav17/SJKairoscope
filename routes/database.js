const mysql = require('mysql');

//create conection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kairoscope',
  multipleStatements: true
});

//Actually connecting with database
connection.connect(function(err) {
  if (err) {
    throw err;
  }
  console.log('MySql Connected...');
});

module.exports = connection;
