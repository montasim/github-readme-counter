/**
 * Counter Controller
 * Handles HTTP requests for counter operations
 * Implements Single Responsibility Principle (SRP) - only handles request/response
 * Follows Clean Code principles with proper error handling and JSDoc comments
 */

const CounterService = require('../services/CounterService');
const ImageService = require('../services/ImageService');
const { sanitizeQueryParams } = require('../utils/validators');
const { formatHexColor } = require('../utils/helpers');
const { DEFAULT_COLORS, HTTP_HEADERS, HTTP_STATUS, ERROR_MESSAGES } = require('../config');

/**
 * CounterController class
 * Handles counter-related HTTP requests
 */
class CounterController {
  /**
   * Creates a new CounterController instance
   * @param {CounterService} counterService - The counter service instance
   * @param {ImageService} imageService - The image service instance
   */
  constructor(counterService = new CounterService(), imageService = new ImageService()) {
    this.counterService = counterService;
    this.imageService = imageService;
  }

  /**
   * Handles GET request to /count.svg
   * Increments the counter and returns an SVG image with the updated count
   * @param {Object} req - Express request object
   * @param {Object} req.query - Query parameters
   * @param {string} req.query.backgroundColor - Background color hex code
   * @param {string} req.query.textColor - Text color hex code
   * @param {Object} res - Express response object
   * @param {Function} next - Express next function (for error handling)
   * @throws {Error} If counter operations or SVG generation fails
   * @example
   * // GET /count.svg
   * // Returns SVG image with incremented counter
   * 
   * // GET /count.svg?backgroundColor=FFFFFF&textColor=0000FF
   * // Returns SVG image with custom colors
   */
  async getCounterSVG(req, res, next) {
    try {
      // Support both new short names (bg, tc) and old long names (backgroundColor, textColor)
      // New parameters take precedence over old ones
      const backgroundColor = req.query.bg || req.query.backgroundColor || DEFAULT_COLORS.BACKGROUND;
      const textColor = req.query.tc || req.query.textColor || DEFAULT_COLORS.TEXT;

      // Validate and sanitize query parameters
      const sanitizedParams = sanitizeQueryParams({
        backgroundColor,
        textColor
      });

      // Format colors with # prefix
      const formattedBackgroundColor = formatHexColor(sanitizedParams.backgroundColor);
      const formattedTextColor = formatHexColor(sanitizedParams.textColor);

      // Increment counter
      const counter = await this.counterService.incrementCounter();

      // Generate SVG
      const svg = this.imageService.generateSVG(
        counter,
        formattedBackgroundColor,
        formattedTextColor
      );

      // Set response headers
      res.set({
        'Content-Type': HTTP_HEADERS.CONTENT_TYPE,
        'Cache-Control': HTTP_HEADERS.CACHE_CONTROL
      });

      // Send SVG response
      res.send(svg);
    } catch (error) {
      // Attach status code if it's a validation error
      if (error.message === ERROR_MESSAGES.INVALID_HEX_COLOR) {
        error.statusCode = HTTP_STATUS.BAD_REQUEST;
      }
      next(error);
    }
  }
}

module.exports = CounterController;
