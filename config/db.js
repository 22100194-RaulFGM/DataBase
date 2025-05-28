const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  ssl: {
    rejectUnauthorized: false 
  }
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error de conexión a la base de datos:', err);
    return;
  }
  console.log('✅ Conectado a la base de datos MySQL');
});

module.exports = connection;