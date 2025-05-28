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
  const { titulo, autor, editorial, fecha_publicacion, genero } = req.body;

  // Construir partes dinámicas solo con campos enviados
  const updates = [];
  const values = [];

  if (titulo) {
    updates.push('titulo = ?');
    values.push(titulo);
  }
  if (autor) {
    updates.push('autor = ?');
    values.push(autor);
  }
  if (editorial) {
    updates.push('editorial = ?');
    values.push(editorial);
  }
  if (fecha_publicacion) {
    const año = fecha_publicacion.toString().slice(0, 4); // extraer solo año
    updates.push('fecha_publicacion = ?');
    values.push(año);
  }
  if (genero) {
    updates.push('genero = ?');
    values.push(genero);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'No hay campos para actualizar' });
  }

  const query = `UPDATE libro SET ${updates.join(', ')} WHERE id_libro = ?`;
  values.push(id);

  db.query(query, values, (err, result) => {
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
