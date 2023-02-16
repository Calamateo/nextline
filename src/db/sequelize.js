const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('./models');
// Aqui se asigna el dialecto con el que se conecta a la DB
const options = {
  dialect: 'postgres',
  logging: config.env === 'dev' && console.log,
};

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

module.exports = sequelize;
