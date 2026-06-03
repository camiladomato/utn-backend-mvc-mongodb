const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');

const { errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());


app.get('/api', (req, res) => {
  res.status(200).json({
    name: 'UTN Task Manager API',
    version: '1.0.0',
    description: 'Servidor backend con arquitectura MVC y autenticación JWT',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

module.exports = app;