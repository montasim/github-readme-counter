/**
 * Helper Utilities
 * Provides common helper functions used across the application
 */

/**
 * Formats a hex color string by adding # prefix if not present
 * @param {string} color - The hex color string (with or without # prefix)
 * @returns {string} The formatted hex color with # prefix
 * @example
 * formatHexColor('FF0000') // returns '#FF0000'
 * formatHexColor('#00FF00') // returns '#00FF00'
 */
const formatHexColor = (color) => {
  if (color.startsWith('#')) {
    return color;
  }
  return `#${color}`;
};

/**
 * Creates a standardized error response object
 * @param {string} message - The error message
 * @param {number} statusCode - The HTTP status code
 * @returns {Object} The error response object
 * @example
 * createErrorResponse('Invalid input', 400)
 * // returns { error: 'Invalid input', statusCode: 400 }
 */
const createErrorResponse = (message, statusCode) => {
  return {
    error: message,
    statusCode
  };
};

/**
 * Creates a standardized success response object
 * @param {Object} data - The response data
 * @param {number} statusCode - The HTTP status code
 * @returns {Object} The success response object
 * @example
 * createSuccessResponse({ count: 123 }, 200)
 * // returns { data: { count: 123 }, statusCode: 200 }
 */
const createSuccessResponse = (data, statusCode) => {
  return {
    data,
    statusCode
  };
};

module.exports = {
  formatHexColor,
  createErrorResponse,
  createSuccessResponse
};
