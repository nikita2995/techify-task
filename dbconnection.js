const config = require('config');

const Sequelize = require('sequelize');
const userModel = require('./models/user');
const { logger } = require('./utils');

const dbConfig = config.get('dbConfig');
const db = new Sequelize(
  `${dbConfig.dialect}://${dbConfig.username}:${dbConfig.password
  }@${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`, {
    logging: false,
  },
);

const User = userModel(db, Sequelize);

db
  .authenticate()
  .then(() => {
    logger.info('DB connection has been established successfully.');
  })
  .catch((err) => {
    logger.error('Unable to connect to the database:', err);
  });

module.exports = {
  db,
  User
};
