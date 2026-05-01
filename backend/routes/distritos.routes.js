const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/distrito.controller');

// GET    /api/distritos          → listar (con paginación y búsqueda)
router.get('/',    controller.listar);

// GET    /api/distritos/:id      → obtener uno
router.get('/:id', controller.obtener);

// POST   /api/distritos          → crear
router.post('/',   controller.crear);

// PUT    /api/distritos/:id      → actualizar
router.put('/:id', controller.actualizar);

// DELETE /api/distritos/:id      → eliminar
router.delete('/:id', controller.eliminar);

module.exports = router;
