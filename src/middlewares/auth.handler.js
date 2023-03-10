/* eslint-disable dot-notation */
const boom = require('@hapi/boom');
const { config } = require('../config/config');

/**
 * check if apiKey exists
 */
function checkApiKey(req, res, next) {
  const apiKey = req.headers['api_key'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

module.exports = checkApiKey;
