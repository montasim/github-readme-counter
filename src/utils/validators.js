/**
 * Input Validation Utilities
 * Provides functions to validate and sanitize user input
 */

const { REGEX, ERROR_MESSAGES } = require('../config');

/**
 * Validates a hex color string
 * @param {string} color - The color string to validate (with or without # prefix)
 * @returns {boolean} True if the color is valid, false otherwise
 * @example
 * validateHexColor('FF0000') // returns true
 * validateHexColor('#00FF00') // returns true
 * validateHexColor('invalid') // returns false
 */
const validateHexColor = (color) => {
  if (typeof color !== 'string') {
    return false;
  }
  return REGEX.HEX_COLOR.test(color);
};

/**
 * Sanitizes and validates query parameters from the request
 * @param {Object} query - The query object from Express request
 * @param {string} query.backgroundColor - The background color hex code
 * @param {string} query.textColor - The text color hex code
 * @returns {Object} Sanitized query parameters with validated colors
 * @throws {Error} If any color parameter is invalid
 * @example
 * sanitizeQueryParams({ backgroundColor: 'FFFFFF', textColor: '000000' })
 * // returns { backgroundColor: 'FFFFFF', textColor: '000000' }
 */
const sanitizeQueryParams = (query) => {
  const sanitized = {};

  // Validate backgroundColor if provided
  if (query.backgroundColor !== undefined) {
    if (!validateHexColor(query.backgroundColor)) {
      throw new Error(ERROR_MESSAGES.INVALID_HEX_COLOR);
    }
    // Remove # prefix if present
    sanitized.backgroundColor = query.backgroundColor.replace('#', '');
  }

  // Validate textColor if provided
  if (query.textColor !== undefined) {
    if (!validateHexColor(query.textColor)) {
      throw new Error(ERROR_MESSAGES.INVALID_HEX_COLOR);
    }
    // Remove # prefix if present
    sanitized.textColor = query.textColor.replace('#', '');
  }

  return sanitized;
};

module.exports = {
  validateHexColor,
  sanitizeQueryParams
};
