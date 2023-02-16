const { ValidationError } = require('sequelize');
const { config } = require('../config/config');

/**
 * Si esta en dev pone los log de errores para su lectura
 */
function logErrors(err, req, res, next) {
  config.env === 'dev' && console.error(err);
  next(err);
}

/**
 * En caso de un error manda status 500.
 * Envia la informacion del error
 */
function errorHandler(err, req, res) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

/**
 * En caso de un error controlado manda status del error asignado.
 * Devuelve el payload del error
 */
function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

/**
 * En caso de un error manda status 409.
 * Envia la informacion del error
 */
function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }
  next(err);
}

module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
};
