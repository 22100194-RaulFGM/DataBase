require('dotenv').config();
const cors = require('cors');
console.log('MYSQLUSER:', process.env.MYSQLUSER);

const express = require('express');
const app = express();
const librosRoutes = require('./routes/libros');
const db = require('./config/db');

app.use(cors());

app.use(express.json());
app.use('/api/libros', librosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});