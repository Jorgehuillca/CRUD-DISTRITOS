import { fetchDistritos, fetchDistritoById, actualizarDistrito, eliminarDistrito } from './api.js';

// ── Estado global ─────────────────────────────────────────────────────────────
let paginaActual = 1;
const LIMIT = 10;
let terminoBusqueda = '';
let debounceTimer;

// ── Referencias DOM ───────────────────────────────────────────────────────────
const tbody          = document.getElementById('tbodyDistritos');
const paginacion     = document.getElementById('paginacion');
const inputBusqueda  = document.getElementById('inputBusqueda');
const modalEditar    = document.getElementById('modalEditar');
const editId         = document.getElementById('editId');
const editNombre     = document.getElementById('editNombre');
const editCodPostal  = document.getElementById('editCodPostal');
const editPoblacion  = document.getElementById('editPoblacion');
const btnGuardar     = document.getElementById('btnGuardarEdicion');
const btnCancelar    = document.getElementById('btnCancelarEdicion');

// ── Renderizar tabla ──────────────────────────────────────────────────────────
const renderTabla = (distritos) => {
  if (!distritos.length) {
    tbody.innerHTML = `<tr><td colspan="4" class="loading">No se encontraron resultados.</td></tr>`;
    return;
  }

  tbody.innerHTML = distritos.map(d => `
    <tr>
      <td>${d.id_dis}</td>
      <td>${escapeHtml(d.nom_dis)}</td>
      <td>${escapeHtml(d.cod_postal)}</td>
      <td>${Number(d.poblacion).toLocaleString('es-PE')}</td>
      <td class="actions">
      <td class="actions">
        <button class="btn btn-edit"    data-id="${d.id_dis}">✏️ Editar</button>
        <button class="btn btn-danger"  data-id="${d.id_dis}">🗑️ Eliminar</button>
      </td>
    </tr>
  `).join('');

  // Eventos de editar y eliminar
  tbody.querySelectorAll('.btn-edit').forEach(btn =>
    btn.addEventListener('click', () => abrirModal(btn.dataset.id))
  );
  tbody.querySelectorAll('.btn-danger').forEach(btn =>
    btn.addEventListener('click', () => confirmarEliminar(btn.dataset.id))
  );
};

// ── Renderizar paginación ─────────────────────────────────────────────────────
const renderPaginacion = (totalPages) => {
  paginacion.innerHTML = '';
  if (totalPages <= 1) return;

  const crearBtn = (label, pagina, disabled = false, activo = false) => {
    const btn = document.createElement('button');
    btn.className = 'page-btn' + (activo ? ' active' : '');
    btn.textContent = label;
    btn.disabled = disabled;
    btn.addEventListener('click', () => { paginaActual = pagina; cargarDatos(); });
    return btn;
  };

  paginacion.appendChild(crearBtn('«', 1,              paginaActual === 1));
  paginacion.appendChild(crearBtn('‹', paginaActual - 1, paginaActual === 1));

  // Rango de páginas visibles
  const rango = 2;
  for (let i = Math.max(1, paginaActual - rango); i <= Math.min(totalPages, paginaActual + rango); i++) {
    paginacion.appendChild(crearBtn(i, i, false, i === paginaActual));
  }

  paginacion.appendChild(crearBtn('›', paginaActual + 1, paginaActual === totalPages));
  paginacion.appendChild(crearBtn('»', totalPages,       paginaActual === totalPages));
};

// ── Cargar datos desde la API ─────────────────────────────────────────────────
const cargarDatos = async () => {
  tbody.innerHTML = `<tr><td colspan="4" class="loading">Cargando...</td></tr>`;
  try {
    const res = await fetchDistritos(paginaActual, LIMIT, terminoBusqueda);
    renderTabla(res.data);
    renderPaginacion(res.totalPages);
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="4" class="loading" style="color:red">Error: ${err.message}</td></tr>`;
  }
};

// ── Buscador con debounce ─────────────────────────────────────────────────────
inputBusqueda.addEventListener('input', (e) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    terminoBusqueda = e.target.value.trim();
    paginaActual = 1;
    cargarDatos();
  }, 350);
});

// ── Modal de edición ──────────────────────────────────────────────────────────
const abrirModal = async (id) => {
  try {
    const d = await fetchDistritoById(id);
    editId.value        = d.id_dis;
    editNombre.value    = d.nom_dis;
    editCodPostal.value = d.cod_postal;
    editPoblacion.value = d.poblacion;
    modalEditar.classList.remove('hidden');
    editNombre.focus();
  } catch (err) {
    alert('Error al cargar el distrito: ' + err.message);
  }
};

btnCancelar.addEventListener('click', () => modalEditar.classList.add('hidden'));
modalEditar.addEventListener('click', (e) => {
  if (e.target === modalEditar) modalEditar.classList.add('hidden');
});

btnGuardar.addEventListener('click', async () => {
  const nom     = editNombre.value.trim();
  const postal  = editCodPostal.value.trim();
  const pob = parseInt(editPoblacion.value);
  if (!nom || !postal) { alert('Completa todos los campos.'); return; }

  try {
    await actualizarDistrito(editId.value, { nom_dis: nom, cod_postal: postal, poblacion: pob });
    modalEditar.classList.add('hidden');
    cargarDatos();
  } catch (err) {
    alert('Error: ' + err.message);
  }
});

// ── Eliminar con confirmación ─────────────────────────────────────────────────
const confirmarEliminar = async (id) => {
  if (!confirm(`¿Eliminar el distrito con ID ${id}?`)) return;
  try {
    await eliminarDistrito(id);
    // Si la página actual queda vacía, retroceder una
    if (paginaActual > 1) paginaActual--;
    cargarDatos();
  } catch (err) {
    alert('Error: ' + err.message);
  }
};

// ── Utilidad: escape HTML ─────────────────────────────────────────────────────
const escapeHtml = (str) =>
  String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

// ── Inicio ────────────────────────────────────────────────────────────────────
cargarDatos();
