/**
 * Server Entry Point
 * Starts the application server
 * This is the main entry point defined in package.json
 */

const startServer = require('./src/index');

// Get port from environment variables or use default
const port = process.env.PORT || process.env.port || 3000;

// Start the server
startServer(port);
