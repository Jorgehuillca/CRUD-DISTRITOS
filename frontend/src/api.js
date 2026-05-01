// ── Configuración base ────────────────────────────────────────────────────────
const API_URL = 'http://localhost:3000/api/distritos';

// ── GET con paginación y búsqueda ─────────────────────────────────────────────
export const fetchDistritos = async (page = 1, limit = 10, search = '') => {
  const params = new URLSearchParams({ page, limit, search });
  const res = await fetch(`${API_URL}?${params}`);
  if (!res.ok) throw new Error('Error al obtener distritos');
  return res.json();
};

// ── GET por ID ────────────────────────────────────────────────────────────────
export const fetchDistritoById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Distrito no encontrado');
  return res.json();
};

// ── POST crear ────────────────────────────────────────────────────────────────
export const crearDistrito = async (data) => {
  const res = await fetch(API_URL, {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.mensaje || 'Error al crear distrito');
  }
  return res.json();
};

// ── PUT actualizar ────────────────────────────────────────────────────────────
export const actualizarDistrito = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method : 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.mensaje || 'Error al actualizar');
  }
  return res.json();
};

// ── DELETE eliminar ───────────────────────────────────────────────────────────
export const eliminarDistrito = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.mensaje || 'Error al eliminar');
  }
  return res.json();
};
