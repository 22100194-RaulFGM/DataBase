const db = require('../config/db');

// Obtener todos los libros
exports.getLibros = (req, res) => {
  db.query('SELECT * FROM libro', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Obtener un libro por ID
exports.getLibroById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM libro WHERE id_libro = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json(result[0]);
  });
};

// Crear un nuevo libro
exports.createLibro = (req, res) => {
  const { titulo, autor, editorial, fecha_publicacion, genero } = req.body;
  const query = 'INSERT INTO libro (titulo, autor, editorial, fecha_publicacion, genero) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [titulo, autor, editorial, fecha_publicacion, genero], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Libro creado', id: result.insertId });
  });
};

// Actualizar un libro
exports.updateLibro = (req, res) => {
  const { id } = req.params;
  const { titulo, autor, editorial, fecha_publicacion } = req.body;
  const query = 'UPDATE libro SET titulo = ?, autor = ?, editorial = ?, fecha_publicacion = ?WHERE id_libro = ?';
  db.query(query, [titulo, autor, editorial, fecha_publicacion, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json({ message: 'Libro actualizado' });
  });
};

// Eliminar un libro
exports.deleteLibro = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM libro WHERE id_libro = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json({ message: 'Libro eliminado' });
  });
};
