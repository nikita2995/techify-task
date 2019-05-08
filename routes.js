
/* ********************************* Import Node Modules ********************************* */
const multer = require('multer');
const fs = require('fs');

/* ********************************* Import Local Modules ********************************* */
const {
  userController, adminController, buyerController, sellerController,
} = require('./controllers');
const { validator, authenticator } = require('./middlewares');
const { logger } = require('./utils');

module.exports = (app) => {

  /* ********************************* User APIs ********************************* */
  // login
  app.post('/login', validator, userController.login);

  // get profile
  app.get('/user/:id/profile', authenticator, validator, userController.getProfile);

  // update profile
  app.put('/user/:id/profile', authenticator, validator, userController.updateProfile);

  // get all users
  app.get('/admin/:id/users', authenticator, validator, adminController.getUsers);

  // get user
  app.get('/admin/:id/user/:userId', authenticator, validator, adminController.getUser);
};
