/**
 * Path Configuration
 * Centralizes all file path configurations for the application
 */

const path = require('path');

/**
 * Application Paths
 * All paths are resolved relative to the current working directory
 */
const PATHS = {
  /** Root directory of the application */
  ROOT: process.cwd(),
  
  /** Source directory */
  SRC: path.join(process.cwd(), 'src'),
  
  /** Counter file path - stores the current counter value */
  COUNTER_FILE: path.join(process.cwd(), 'src', 'counter.txt')
};

module.exports = {
  PATHS
};
