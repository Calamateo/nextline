const env = process.env.NODE_ENV || 'dev';
// Depende del env que se asigna se usa uno de estos envs
const envs = {
  'dev': '.env',
  'test': '.env.e2e'
};

const options = {};
// En caso de que no encuentre uno de los env de arriva se le acciona el que se declaro
// esto sirve para CI
if (envs[env]) {
  options.path = envs[env];
}

require('dotenv').config(options);

const config = {
  env,
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  smtpEmail: process.env.SMTP_EMAIL,
  smtpPassword: process.env.SMTP_PASSWORD,
};

// console.log('CONFIG', config);

module.exports = { config };
