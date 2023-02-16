const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  app.get('/', (req, res) => {
    res.send('Challenge nextline \nDaniel Calamateo');
  });

  return app;
};

module.exports = createApp;
