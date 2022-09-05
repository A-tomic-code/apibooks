const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
      host : 'localhost',
      user : 'root',
      password : 'alohomora',
      database : 'primeraApp'        
    })

module.exports = connection;