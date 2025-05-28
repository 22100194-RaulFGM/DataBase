const API_URL = 'https://two2100194-backend.onrender.com/api/libros';

const libroForm = document.getElementById('libroForm');
const librosContainer = document.getElementById('librosContainer');
const message = document.getElementById('message');

async function fetchLibros() {
  try {
    const res = await fetch(API_URL);
    const libros = await res.json();
    renderLibros(libros);
  } catch (err) {
    showMessage('Error al cargar libros', true);
  }
}

function renderLibros(libros) {
  librosContainer.innerHTML = '';
  libros.forEach(libro => {
    const div = document.createElement('div');
    div.className = 'libro';
    div.innerHTML = `
      <span><strong>${libro.titulo}</strong> de ${libro.autor}</span>
      <button class="update-btn" onclick="updateLibro(${libro.id_libro})">Modificar</button>;
      <button class="delete-btn" onclick="deleteLibro(${libro.id_libro})">Eliminar</button>`;
    librosContainer.appendChild(div);
  });
}

libroForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nuevoLibro = {
    titulo: document.getElementById('titulo').value,
    autor: document.getElementById('autor').value,
    editorial: document.getElementById('editorial').value,
    fecha_publicacion: document.getElementById('fecha_publicacion').value,
    genero: document.getElementById('genero').value
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoLibro)
    });

    if (res.ok) {
      showMessage('Libro agregado correctamente');
      libroForm.reset();
      fetchLibros();
    } else {
      showMessage('Error al agregar libro', true);
    }
  } catch (err) {
    showMessage('Error al conectar con el servidor', true);
  }
});

async function deleteLibro(id) {
  if (!confirm('¿Estás seguro de eliminar este libro?')) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (res.ok) {
      showMessage('Libro eliminado');
      fetchLibros();
    } else {
      showMessage('Error al eliminar libro', true);
    }
  } catch (err) {
    showMessage('Error al conectar con el servidor', true);
  }
}

function showMessage(text, isError = false) {
  message.textContent = text;
  message.className = isError ? 'message error' : 'message';
  setTimeout(() => { message.textContent = ''; }, 3000);
}

async function updateLibro(id) {
  try {
    const libroRes = await fetch(`${API_URL}/${id}`);
    const libro = await libroRes.json();

    const titulo = prompt('Nuevo título:', libro.titulo);
    const autor = prompt('Nuevo autor:', libro.autor);
    const editorial = prompt('Nueva editorial:', libro.editorial);
    const fecha_publicacion = prompt('Nuevo año de publicación:', libro.fecha_publicacion);
    const genero = prompt('Nuevo género:', libro.genero);

    const updatedFields = {};

    if (titulo && titulo !== libro.titulo) updatedFields.titulo = titulo;
    if (autor && autor !== libro.autor) updatedFields.autor = autor;
    if (editorial && editorial !== libro.editorial) updatedFields.editorial = editorial;
    if (fecha_publicacion && fecha_publicacion !== libro.fecha_publicacion)
      updatedFields.fecha_publicacion = fecha_publicacion.slice(0, 4); // solo año
    if (genero && genero !== libro.genero) updatedFields.genero = genero;

    if (Object.keys(updatedFields).length === 0) {
      showMessage('No se realizaron cambios');
      return;
    }

    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields)
    });

    if (res.ok) {
      showMessage('Libro modificado correctamente');
      fetchLibros();
    } else {
      showMessage('Error al modificar libro', true);
    }
  } catch (err) {
    showMessage('Error al conectar con el servidor', true);
  }
}

function showMessage(text, isError = false) {
  message.textContent = text;
  message.className = isError ? 'message error' : 'message';
  setTimeout(() => { message.textContent = ''; }, 3000);
}

fetchLibros();
