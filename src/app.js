const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  app.get('/', (req, res) => {
    res.send('Challenge nextline \nDaniel Calamateo');
  });

  // Middlewares
  app.use(logErrors);
  app.use(ormErrorHandler);
  app.use(boomErrorHandler);
  app.use(errorHandler);

  return app;
};

module.exports = createApp;
