/**
 * Image Service
 * Handles SVG image generation for the counter display
 * Implements Single Responsibility Principle (SRP) - only generates SVG images
 */

const { SVG_CONFIG } = require('../config');

/**
 * ImageService class
 * Generates SVG images from counter values
 */
class ImageService {
  /**
   * Creates a new ImageService instance
   */
  constructor() {
    this.places = SVG_CONFIG.PLACES;
    this.digitWidth = SVG_CONFIG.DIGIT_WIDTH;
    this.digitHeight = SVG_CONFIG.DIGIT_HEIGHT;
    this.fontSize = SVG_CONFIG.FONT_SIZE;
    this.textXOffset = SVG_CONFIG.TEXT_X_OFFSET;
    this.textYPosition = SVG_CONFIG.TEXT_Y_POSITION;
    this.rectYPosition = SVG_CONFIG.RECT_Y_POSITION;
    this.fontFamily = SVG_CONFIG.FONT_FAMILY;
    this.title = SVG_CONFIG.TITLE;
  }

  /**
   * Generates an SVG image displaying the counter value
   * @param {number} count - The counter value to display
   * @param {string} backgroundColor - The background color in hex format (with # prefix)
   * @param {string} textColor - The text color in hex format (with # prefix)
   * @returns {string} The SVG string
   * @example
   * const imageService = new ImageService();
   * const svg = imageService.generateSVG(123456, '#000000', '#EB008B');
   */
  generateSVG(count, backgroundColor, textColor) {
    const countArray = this._formatCounter(count);
    const svgParts = this._generateSVGParts(countArray, backgroundColor, textColor);
    const svg = this._wrapInSVG(svgParts);
    return svg;
  }

  /**
   * Formats the counter value as an array of digits
   * @private
   * @param {number} count - The counter value
   * @returns {string[]} Array of digit strings
   */
  _formatCounter(count) {
    return count.toString().padStart(this.places, '0').split('');
  }

  /**
   * Generates the SVG parts for each digit
   * @private
   * @param {string[]} countArray - Array of digit strings
   * @param {string} backgroundColor - The background color
   * @param {string} textColor - The text color
   * @returns {string} The SVG parts string
   */
  _generateSVGParts(countArray, backgroundColor, textColor) {
    return countArray.map((digit, index) => {
      const x = index * this.digitWidth;
      const textX = x + this.textXOffset;
      
      return `
        <rect fill="${backgroundColor}" x="${x}" y="${this.rectYPosition}" width="${this.digitWidth}" height="${this.digitHeight}" />
        <text font-family="${this.fontFamily}" font-size="${this.fontSize}" fill="${textColor}">
            <tspan x="${textX}" y="${this.textYPosition}">${digit}</tspan>
        </text>
      `;
    }).join('');
  }

  /**
   * Wraps the SVG parts in the SVG container
   * @private
   * @param {string} svgParts - The SVG parts string
   * @returns {string} The complete SVG string
   */
  _wrapInSVG(svgParts) {
    const width = this.places * this.digitWidth;
    const height = 30; // Fixed height

    return `<?xml version="1.0" encoding="UTF-8"?>
    <svg width="${width}px" height="${height}px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>${this.title}</title>
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          ${svgParts}
        </g>
    </svg>
  `;
  }
}

module.exports = ImageService;
