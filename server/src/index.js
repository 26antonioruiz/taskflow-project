const path = require('path');
const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/env');

const taskRoutes = require('./routes/task.routes');

const app = express();

// middlewares (CORS explícito: Live Server u otro puerto llama a localhost:3000)
app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
  })
);
app.use(express.json());

// logger (para la práctica)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// rutas API (antes del estático)
app.use('/api/v1/tasks', taskRoutes);

// frontend: index.html, app.js, img/… (abre http://localhost:PUERTO/)
const publicDir = path.join(__dirname, '..', '..');
app.use(express.static(publicDir));

// manejo global de errores
app.use((err, req, res, next) => {
  if (err.message === 'NOT_FOUND') {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});