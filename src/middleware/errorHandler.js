/**
 * Global Error Handler Middleware
 * Catches all errors and returns appropriate HTTP responses
 * Express.js Best Practice: Centralized error handling
 */

const { HTTP_STATUS, ERROR_MESSAGES } = require('../config');

/**
 * Error handler middleware function
 * @param {Error} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  // Log the error for debugging
  console.error(`[${new Date().toISOString()}] Error:`, {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method
  });

  // Determine the status code
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

  // Determine the error message
  let message = err.message || ERROR_MESSAGES.INTERNAL_ERROR;

  // Don't expose internal error details in production
  if (statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR && process.env.NODE_ENV === 'production') {
    message = ERROR_MESSAGES.INTERNAL_ERROR;
  }

  // Send error response
  res.status(statusCode).json({
    error: message,
    statusCode
  });
};

module.exports = errorHandler;
