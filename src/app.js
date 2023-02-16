const express = require('express');
const swaggerUI = require('swagger-ui-express');

const swaggerDocument = require('../swagger.json');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');
const routerApi = require('./routes');

const createApp = () => {
  // Create app
  const app = express();

  // json
  app.use(express.json());

  // Swagger
  app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  // Path initial
  app.get('/', (req, res) => {
    res.send('Challenge nextline \nDaniel Calamateo');
  });

  // Routes
  routerApi(app);

  // Middlewares
  app.use(logErrors);
  app.use(ormErrorHandler);
  app.use(boomErrorHandler);
  app.use(errorHandler);

  return app;
};

module.exports = createApp;
