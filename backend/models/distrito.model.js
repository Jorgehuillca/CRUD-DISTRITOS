const db = require('../config/db');
 
// ── LISTAR con paginación y búsqueda ──────────────────────────────────────────
// sp_listar_distritos devuelve 2 result sets:
//   results[0] → filas de la página actual
//   results[1] → [{ total: N }]
const getAll = async (page = 1, limit = 10, search = '') => {
  const [results] = await db.query(
    'CALL sp_listar_distritos(?, ?, ?)',
    [page, limit, search]
  );
 
  const rows  = results[0];
  const total = results[1][0].total;
 
  return { rows, total, totalPages: Math.ceil(total / limit) };
};
 
// ── OBTENER por ID ─────────────────────────────────────────────────────────────
const getById = async (id) => {
  const [results] = await db.query(
    'CALL sp_obtener_distrito(?)',
    [id]
  );
  return results[0][0]; // primer result set, primera fila
};
 
// ── CREAR ──────────────────────────────────────────────────────────────────────
// sp_crear_distrito devuelve [{ insertId: N }]
const create = async ({ nom_dis, cod_postal, poblacion }) => {
  const [results] = await db.query(
    'CALL sp_crear_distrito(?, ?, ?)',
    [nom_dis, cod_postal, poblacion]
  );
  return results[0][0].insertId;
};
 
// ── ACTUALIZAR ─────────────────────────────────────────────────────────────────
// sp_actualizar_distrito devuelve [{ affectedRows: N }]
const update = async (id, { nom_dis, cod_postal, poblacion }) => {
  const [results] = await db.query(
    'CALL sp_actualizar_distrito(?, ?, ?, ?)',
    [id, nom_dis, cod_postal, poblacion]
  );
  return results[0][0].affectedRows;
};
 
// ── ELIMINAR ───────────────────────────────────────────────────────────────────
// sp_eliminar_distrito devuelve [{ affectedRows: N }]
const remove = async (id) => {
  const [results] = await db.query(
    'CALL sp_eliminar_distrito(?)',
    [id]
  );
  return results[0][0].affectedRows;
};
 
module.exports = { getAll, getById, create, update, remove };