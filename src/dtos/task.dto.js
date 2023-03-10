const Joi = require('joi');
// Specifications of what type a variable is, and which ones are required in some operations.
const id = Joi.number().integer();
const title = Joi.string().min(3).max(50);
const description = Joi.string().max(200);
const status = Joi.string();
const tasked = Joi.string();
const tags = Joi.string();
const comments = Joi.string();
const deliveryDate = Joi.date();

/**
 * Task creation. check that it has the required parameters.
 */
const createTask = Joi.object({
  title: title.required(),
  description: description.required(),
  status: status.required(),
  deliveryDate: deliveryDate.required(),
  tasked,
  tags,
  comments,
});

/**
 * Task update. Check that you have the required parameters.
 */
const updateTask = Joi.object({
  title,
  description,
  status,
  deliveryDate,
  tasked,
  tags,
  comments,
});

/**
 * For endpoints that require validation of Id
 */
const getTaskId = Joi.object({
  id: id.required(),
});

module.exports = {
  createTask,
  updateTask,
  getTaskId,
};
