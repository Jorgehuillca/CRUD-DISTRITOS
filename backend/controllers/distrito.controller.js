const Distrito = require('../models/distrito.model');

// ── GET /api/distritos?page=1&limit=10&search= ────────────────────────────────
const listar = async (req, res) => {
  try {
    const page   = parseInt(req.query.page)   || 1;
    const limit  = parseInt(req.query.limit)  || 10;
    const search = req.query.search?.trim()   || '';

    const data = await Distrito.getAll(page, limit, search);

    res.json({
      data      : data.rows,
      total     : data.total,
      totalPages: data.totalPages,
      page,
      limit
    });
  } catch (error) {
    console.error('Error listar:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// ── GET /api/distritos/:id ────────────────────────────────────────────────────
const obtener = async (req, res) => {
  try {
    const distrito = await Distrito.getById(req.params.id);
    if (!distrito) return res.status(404).json({ mensaje: 'Distrito no encontrado' });
    res.json(distrito);
  } catch (error) {
    console.error('Error obtener:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// ── POST /api/distritos ───────────────────────────────────────────────────────
const crear = async (req, res) => {
  try {
    const { nom_dis, cod_postal, poblacion } = req.body;
    if (!nom_dis || !cod_postal || poblacion === undefined) {
      return res.status(400).json({ mensaje: 'Nombre, Código Postal y Población son requeridos' });
}
    const id = await Distrito.create({ nom_dis, cod_postal, poblacion });
    res.status(201).json({ mensaje: 'Distrito creado', id });
  } catch (error) {
    console.error('Error crear:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// ── PUT /api/distritos/:id ────────────────────────────────────────────────────
const actualizar = async (req, res) => {
  try {
    const { nom_dis, cod_postal, poblacion } = req.body;
    if (!nom_dis || !cod_postal || poblacion === undefined) {
      return res.status(400).json({ mensaje: 'Nombre, Código Postal y Población son requeridos' });
}
    const filas = await Distrito.update(req.params.id, { nom_dis, cod_postal, poblacion });
    if (!filas) return res.status(404).json({ mensaje: 'Distrito no encontrado' });
    res.json({ mensaje: 'Distrito actualizado' });
  } catch (error) {
    console.error('Error actualizar:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// ── DELETE /api/distritos/:id ─────────────────────────────────────────────────
const eliminar = async (req, res) => {
  try {
    const filas = await Distrito.remove(req.params.id);
    if (!filas) return res.status(404).json({ mensaje: 'Distrito no encontrado' });
    res.json({ mensaje: 'Distrito eliminado' });
  } catch (error) {
    console.error('Error eliminar:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = { listar, obtener, crear, actualizar, eliminar };
