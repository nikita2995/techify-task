
/** ********************** Require Node modules ********************* */
const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

/** ********************** Require Local modules ********************* */
const routers = require('./routes');
const { logger } = require('./utils');
const dbconnection = require('./dbconnection'); // eslint-disable-line no-unused-vars
const swaggerDocument = require('./swagger.json');
const { errorHandler, responseHandler } = require('./middlewares');

/** ********************** Varaiable Listing ********************* */
const app = express();
const router = express.Router();
const { port } = config.get('General');
const env = process.env.NODE_ENV || 'development';

// Router Setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', router);

routers(router);

// Swagger configuration
if (env === 'development') {
  const options = {
    explorer: true,
  };

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
  logger.info('Swagger running on http://localhost:5000/api-docs');
}

app.use(responseHandler);
app.use(errorHandler);

// Server Start
const server = app.listen(port, (error) => {
  if (error) logger.error('Error while Application startup', error);
  else logger.info(`Application connected to ${env} environment at ${port} port`);
});