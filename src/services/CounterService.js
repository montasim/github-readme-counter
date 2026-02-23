/**
 * Counter Service
 * Handles all counter-related operations (read, increment, write)
 * Implements Single Responsibility Principle (SRP)
 * Follows Dependency Inversion Principle (DIP) - can be easily swapped for different storage backends
 */

const fs = require('fs').promises;
const { PATHS, ERROR_MESSAGES } = require('../config');

/**
 * CounterService class
 * Manages counter operations with file-based storage
 */
class CounterService {
  /**
   * Creates a new CounterService instance
   * @param {string} counterFilePath - Path to the counter file (optional, defaults to config)
   */
  constructor(counterFilePath = PATHS.COUNTER_FILE) {
    this.counterFilePath = counterFilePath;
  }

  /**
   * Reads the current counter value from the file
   * @returns {Promise<number>} The current counter value
   * @throws {Error} If the file cannot be read or contains invalid data
   */
  async getCounter() {
    try {
      const data = await fs.readFile(this.counterFilePath, 'utf8');
      const counter = parseInt(data, 10);

      if (isNaN(counter)) {
        throw new Error(ERROR_MESSAGES.INVALID_COUNTER_VALUE);
      }

      return counter;
    } catch (error) {
      if (error.code === 'ENOENT') {
        // File doesn't exist, return 0
        return 0;
      }
      throw new Error(`${ERROR_MESSAGES.COUNTER_READ_ERROR}: ${error.message}`);
    }
  }

  /**
   * Increments the counter value
   * @returns {Promise<number>} The incremented counter value
   * @throws {Error} If the counter cannot be incremented
   */
  async incrementCounter() {
    const currentCounter = await this.getCounter();
    const newCounter = currentCounter + 1;
    await this.setCounter(newCounter);
    return newCounter;
  }

  /**
   * Sets the counter to a specific value
   * @param {number} value - The new counter value
   * @returns {Promise<void>}
   * @throws {Error} If the value is invalid or cannot be written
   */
  async setCounter(value) {
    if (typeof value !== 'number' || isNaN(value) || value < 0) {
      throw new Error(ERROR_MESSAGES.INVALID_COUNTER_VALUE);
    }

    try {
      await fs.writeFile(this.counterFilePath, value.toString(), 'utf8');
    } catch (error) {
      throw new Error(`${ERROR_MESSAGES.COUNTER_WRITE_ERROR}: ${error.message}`);
    }
  }
}

module.exports = CounterService;
