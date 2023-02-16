const { Task, TaskSchema } = require('./task.model');

// Initialize a model, representing a table in the DB, with attributes and options.
function setupModels(sequelize) {
  Task.init(TaskSchema, Task.config(sequelize));
}

module.exports = setupModels;
