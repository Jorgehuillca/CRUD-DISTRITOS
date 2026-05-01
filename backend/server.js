require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const distritosRouter = require('./routes/distritos.routes');

const app  = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/distritos', distritosRouter);

// Ruta raíz de verificación
app.get('/', (req, res) => {
  res.json({ mensaje: 'API CRUD Distritos activa ✔' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
