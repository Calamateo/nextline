const express = require('express');
const { getTaskId, createTask, updateTask } = require('../dtos/task.dto');
const validatorHandler = require('../middlewares/validator.handler');

const TaskService = require('../services/task.service');

const taskService = new TaskService();
const router = express.Router();

router.get(
  '/',
  async (req, res, next) => {
    try {
      const tasks = await taskService.getAllTasks();
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/:id',
  validatorHandler(getTaskId, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const task = await taskService.getTask(id);
      res.json(task);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createTask, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newTask = await taskService.createTask(body);
      res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getTaskId, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const taskDelete = await taskService.deleteTask(id);
      res.json(taskDelete);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(getTaskId, 'params'),
  validatorHandler(updateTask, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const taskUpdate = await taskService.putTask(id, body);
      res.json(taskUpdate);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
