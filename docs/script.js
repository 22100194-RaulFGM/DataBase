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
      <button class="delete-btn" onclick="deleteLibro(${libro.id_libro})">Eliminar</button>
    `;
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

fetchLibros();
