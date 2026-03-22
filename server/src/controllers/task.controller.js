const taskService = require('../services/task.service');

const getTasks = (req, res) => {
  res.json(taskService.getAll());
};

const createTask = (req, res) => {
  const { text, house, priority } = req.body;

  if (!text || typeof text !== 'string' || text.length < 3) {
    return res.status(400).json({
      error: 'El texto debe tener al menos 3 caracteres'
    });
  }

  const task = taskService.create({ text, house, priority });

  res.status(201).json(task);
};

const deleteTask = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    taskService.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const toggle = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const task = taskService.toggleComplete(id);

    res.json(task);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  toggle
};