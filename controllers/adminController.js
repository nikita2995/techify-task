/* eslint-disable max-len */
const Boom = require('boom');

/* ********************************* Import Local Modules ********************************* */
const { logger } = require('../utils');
const { userService } = require('../services');

module.exports = {

  getUsers: async (req, res, next) => {
    try {
      logger.info('Get all User Request: ');
      const data = await userService.getUsers();

      if (!data) {
        next(Boom.conflict('Error while getting User'));
      } else {
        res.data = data;
        next();
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  getUser: async (req, res, next) => {
    try {
      logger.info('Get User Request: ', req.params);

      const userDetail = await userService.getUserDetails(req.params.userId);
      res.data = userDetail;
      next();
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  }
};
