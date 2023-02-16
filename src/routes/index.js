const express = require('express');
const tasksRouter = require('./tasks.router');

/**
 * Route storage
 * @param {*} app - App express instance
 */
const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/tasks', tasksRouter);
};

module.exports = routerApi;
