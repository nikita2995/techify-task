const Boom = require('boom');

/* ********************************* Import Local Modules ********************************* */
const { logger } = require('../utils');
const { userService } = require('../services');
const { authentication } = require('../helpers');


module.exports = {

  login: async (req, res, next) => {
    try {
      logger.info('Login Request: ', req.body);

      const loginResult = await userService.login(req.body);
      if (loginResult) {
        const token = await authentication.createToken(loginResult);
        const responseData = {
          token,
          email: loginResult.email,
          userId: loginResult.userId,
          role: loginResult.role,
        };
        if (loginResult.role !== 'admin') {
          const userDetail = await userService.getUserDetails(loginResult.userId);
          if (userDetail != null) responseData.companyName = userDetail.companyName;
          else responseData.companyName = '';
          res.data = responseData;
          next();
        } else {
          res.data = responseData;
          next();
        }
      } else {
        next(Boom.notFound('User does not exist'));
      }
    } catch (err) {
      logger.error(err);
      if (err.message === 'Invalid password') {
        next(Boom.unauthorized('Invalid Password'));
      } else if (err.message === 'User does not exist') {
        next(Boom.notFound('User does not exist'));
      } else {
        next(Boom.conflict('Something went wrong'));
      }
    }
  },

  updateProfile: async (req, res, next) => {
    try {
      logger.info('Update Profile Request: ', req.body);
      const result = await userService.updateProfile(req.params.id, req.body);

      if (!result[0]) {
        next(Boom.conflict('Error while updating details'));
      } else {
        res.message = 'Profile updated successfully!';
        next();
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  getProfile: async (req, res, next) => {
    try {
      logger.info('Get Profile Request: ', req.params);

      const userDetail = await userService.getUserDetails(req.params.id);
      res.data = userDetail;
      next();
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },
};
