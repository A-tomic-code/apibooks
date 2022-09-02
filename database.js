const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
      host : 'localhost',
      user : 'root',
      password : '.Kikoloko0',
      database : 'primeraApp'        
    })

module.exports = connection;