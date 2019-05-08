
/** ********************** Require Node modules ********************* */
const JOI = require('joi');
const Boom = require('boom');

/** ********************** Require Local modules ********************* */
const { logger } = require('../utils');

const schema = {

  // user apis
  '/login': {
    'POST': {
      body: JOI.object().keys({
        email: JOI.string().email().required(),
        password: JOI.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
        userRole: JOI.string(),
      }),
      params: null,
    }
  },

  '/user/:id/profile': {
    'GET': {
      params: JOI.object().keys({
        id: JOI.number().required(),
      }),
      body: null,
    },
    'PUT': {
      params: JOI.object().keys({
        id: JOI.number().required(),
      }),
      body: JOI.object().keys({
        email: JOI.string().email(),
        address: JOI.string(),
        name: JOI.string(),
        userRole: JOI.string(),
        contactNumber: JOI.string().regex(/^\d{10}$/),
        passowrd: JOI.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
      })
    }
  },

  //admin apis
  '/admin/:id/users': {
    'GET': {
      body: null,
      params: JOI.object().keys({
        id: JOI.number().required(),
      }),
    }
  },

  '/admin/:id/user/:userId': {
    'GET': {
      params: JOI.object().keys({
        id: JOI.number().required(),
        userId: JOI.number().required(),
      }),
      body: null
    },
  }
};

module.exports = async (req, res, next) => {
  try {
    if (schema[req.route.path][req.method].body) {
      // Body validation
      await JOI.validate(req.body, schema[req.route.path][req.method].body);
    }
    if (schema[req.route.path][req.method].params) {
      // Param validation
      await JOI.validate(req.params, schema[req.route.path][req.method].params);
    }
    if (schema[req.route.path][req.method].query) {
      await JOI.validate(req.query, schema[req.route.path][req.method].query);
    }
    next();
  } catch (err) {
    logger.error('Error in API validation', err.details[0].message);
    next(Boom.badData(err.details[0].message));
  }
};
