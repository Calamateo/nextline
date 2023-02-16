const boom = require('@hapi/boom');

/**
 * Validation management, verifies that the basic requirements are met
 * @param {Object} schema - Schema dto to check
 * @param {*} property - Property to check ('params' or 'body').
 * @returns in case of error, returns a status 404
 * @link https://joi.dev/api/?v=17.7.0#general-usage
 */
function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property]; // req.params or req.body
    const { error } = schema.validate(data, { abortEarly: false }); // validate the schema
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

module.exports = validatorHandler;
