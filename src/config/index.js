/**
 * Configuration Module
 * Exports all configuration constants and paths
 */

const { SVG_CONFIG, DEFAULT_COLORS, HTTP_HEADERS, HTTP_STATUS, ERROR_MESSAGES, QUERY_PARAMS, REGEX } = require('./constants');
const { PATHS } = require('./paths');

module.exports = {
  SVG_CONFIG,
  DEFAULT_COLORS,
  HTTP_HEADERS,
  HTTP_STATUS,
  ERROR_MESSAGES,
  QUERY_PARAMS,
  REGEX,
  PATHS
};
