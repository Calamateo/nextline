/* eslint-disable class-methods-use-this */
const boom = require('@hapi/boom'); // Error handling
const { models } = require('../db/sequelize'); // Repository model

class TaskService {
  /**
   * Create a new task
   * @param {Object} data - Task data, title, description etc.
   * @returns New task
   */
  async createTask(data) {
    const newTask = await models.Task.create(data);
    return newTask;
  }

  /**
   * Find all tasks
   * @returns Brief information on all tasks
   * @link https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
   */
  async getAllTasks() {
    // Performs a query with the help of the ORM, more information in the link
    const tasks = await models.Task.findAll({
      attributes: { exclude: ['comments', 'tasked', 'tags'] },
    }); // SELECT id, title, description, status, delivery_date FROM tasks;
    return tasks;
  }

  /**
   * Get one task by id
   * @param {Number} id - Id of the task
   * @returns all the information of a task
   * @throws 404 task not found
   */
  async getTask(id) {
    const task = await models.Task.findByPk(id);
    if (!task) {
      // handle error, return 404 not found
      throw boom.notFound('Task not found');
    }
    return task;
  }

  /**
   * Delete one task by id
   * @param {Number} id - Id of the task to delete
   * @returns Delete a task { id }
   */
  async deleteTask(id) {
    const task = await this.getTask(id);
    await task.destroy();
    return { id };
  }

  /**
   * Put one task by id
   * @param {Number} id - Id of the task to delete
   * @param {Object} dataUpdate - Task data update
   * @returns Edited task
   */
  async putTask(id, dataUpdate) {
    const task = await this.getTask(id);
    const updateTask = await task.update(dataUpdate);
    return updateTask;
  }
}

module.exports = TaskService;
