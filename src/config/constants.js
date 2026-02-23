/**
 * Application Constants
 * Centralizes all magic numbers, default values, and configuration constants
 */

/**
 * SVG Configuration
 */
const SVG_CONFIG = {
  /** Number of digits to display in the counter */
  PLACES: 7,
  /** Width of each digit box in pixels */
  DIGIT_WIDTH: 32,
  /** Height of each digit box in pixels */
  DIGIT_HEIGHT: 29,
  /** Font size for the counter digits */
  FONT_SIZE: 24,
  /** X offset for text within each digit box */
  TEXT_X_OFFSET: 7,
  /** Y position for text within each digit box */
  TEXT_Y_POSITION: 22,
  /** Y position for the background rectangle */
  RECT_Y_POSITION: 0.5,
  /** Font family for the counter text */
  FONT_FAMILY: 'Roboto',
  /** SVG title */
  TITLE: 'Count'
};

/**
 * Default Colors
 */
const DEFAULT_COLORS = {
  /** Default background color (black) */
  BACKGROUND: '000000',
  /** Default text color (magenta) */
  TEXT: 'EB008B'
};

/**
 * HTTP Headers
 */
const HTTP_HEADERS = {
  /** Content type for SVG images */
  CONTENT_TYPE: 'image/svg+xml',
  /** Cache control headers to prevent caching */
  CACHE_CONTROL: 'max-age=0, no-cache, no-store, must-revalidate'
};

/**
 * HTTP Status Codes
 */
const HTTP_STATUS = {
  /** OK - Request succeeded */
  OK: 200,
  /** Bad Request - Invalid input */
  BAD_REQUEST: 400,
  /** Internal Server Error - Server error */
  INTERNAL_SERVER_ERROR: 500,
  /** Not Found - Resource not found */
  NOT_FOUND: 404
};

/**
 * Error Messages
 */
const ERROR_MESSAGES = {
  /** Error when counter file cannot be read */
  COUNTER_READ_ERROR: 'Failed to read counter file',
  /** Error when counter file cannot be written */
  COUNTER_WRITE_ERROR: 'Failed to write counter file',
  /** Error when counter value is invalid */
  INVALID_COUNTER_VALUE: 'Invalid counter value',
  /** Error when hex color is invalid */
  INVALID_HEX_COLOR: 'Invalid hex color format',
  /** Generic internal server error */
  INTERNAL_ERROR: 'Internal server error',
  /** Route not found */
  NOT_FOUND: 'Route not found'
};

/**
 * Query Parameter Names
 */
const QUERY_PARAMS = {
  /** Background color query parameter */
  BACKGROUND_COLOR: 'backgroundColor',
  /** Text color query parameter */
  TEXT_COLOR: 'textColor'
};

/**
 * Regular Expressions
 */
const REGEX = {
  /** Hex color pattern (6 hex digits, optional # prefix) */
  HEX_COLOR: /^#?([A-Fa-f0-9]{6})$/
};

module.exports = {
  SVG_CONFIG,
  DEFAULT_COLORS,
  HTTP_HEADERS,
  HTTP_STATUS,
  ERROR_MESSAGES,
  QUERY_PARAMS,
  REGEX
};
