const express = require('express');

const createApp = () => {
  const app = express();
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Challenge nextline \nDaniel Calamateo');
  });
  return app;
};

module.exports = createApp;
