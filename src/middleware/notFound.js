/**
 * 404 Not Found Middleware
 * Handles requests to undefined routes
 * Express.js Best Practice: Proper 404 handling
 */

const { HTTP_STATUS, ERROR_MESSAGES } = require('../config');

/**
 * 404 handler middleware function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const notFound = (req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    error: ERROR_MESSAGES.NOT_FOUND,
    statusCode: HTTP_STATUS.NOT_FOUND,
    path: req.url
  });
};

module.exports = notFound;
