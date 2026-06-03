const express = require('express');
const cors = require('cors');

// Importar las rutas
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');

const { errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/ping', (req, res) => {
  res.json({ message: 'pong', status: 'Servidor operativo' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

module.exports = app;