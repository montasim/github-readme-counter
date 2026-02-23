/**
 * Application Entry Point
 * Initializes and starts the Express server
 * Express.js Best Practice: Proper server initialization and graceful shutdown
 */

const createApp = require('./app');

/**
 * Starts the server
 * @param {number} port - The port to listen on
 * @returns {http.Server} The server instance
 */
const startServer = (port) => {
  const app = createApp();
  const server = app.listen(port, () => {
    console.info(`Server listening on port ${server.address().port}`);
  });

  // Handle server errors
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use`);
    } else {
      console.error(`Server error: ${error.message}`);
    }
    process.exit(1);
  });

  // Graceful shutdown handling
  const gracefulShutdown = (signal) => {
    console.info(`\n${signal} received. Starting graceful shutdown...`);
    
    server.close(() => {
      console.info('Server closed successfully');
      process.exit(0);
    });

    // Force shutdown after 10 seconds
    setTimeout(() => {
      console.error('Forcing shutdown after timeout');
      process.exit(1);
    }, 10000);
  };

  // Handle termination signals
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    gracefulShutdown('uncaughtException');
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    gracefulShutdown('unhandledRejection');
  });

  return server;
};

module.exports = startServer;
