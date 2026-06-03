const Task = require('../models/Task');


const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json({
      status: 'success',
      results: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};


const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      res.status(400);
      throw new Error('El título de la tarea es obligatorio');
    }

    const newTask = await Task.create({
      title,
      description,
      user: req.user.id 
    });

    res.status(201).json({
      status: 'success',
      data: newTask
    });
  } catch (error) {
    next(error);
  }
};


const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    
    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user.id },
      req.body,
      { new: true, runValidators: true } 
    );

    if (!task) {
      res.status(404);
      throw new Error('Tarea no encontrada o no estás autorizado para modificarla');
    }

    res.json({
      status: 'success',
      data: task
    });
  } catch (error) {
    next(error);
  }
};


const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });

    if (!task) {
      res.status(404);
      throw new Error('Tarea no encontrada o no estás autorizado para eliminarla');
    }

    res.json({
      status: 'success',
      message: 'Tarea eliminada correctamente'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };