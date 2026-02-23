/**
 * Express Application Setup
 * Configures Express app with middleware and routes
 * Express.js Best Practice: Proper middleware chain and configuration
 */

const express = require('express');
const CounterController = require('./controllers/CounterController');
const { createCounterRoutes, createHealthRoutes } = require('./routes');
const logger = require('./middleware/logger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

/**
 * Creates and configures the Express application
 * @returns {express.Application} The configured Express app
 */
const createApp = () => {
  const app = express();

  // Initialize services and controllers
  const counterController = new CounterController();

  // Register middleware
  app.use(logger);

  // Register routes
  app.use('/', createCounterRoutes(counterController));
  app.use('/', createHealthRoutes());

  // Register 404 handler (must be after all routes)
  app.use(notFound);

  // Register error handler (must be last)
  app.use(errorHandler);

  return app;
};

module.exports = createApp;
