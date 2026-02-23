/**
 * Request Logger Middleware
 * Logs incoming requests and responses
 * Express.js Best Practice: Request logging for debugging and monitoring
 */

/**
 * Request logger middleware function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const logger = (req, res, next) => {
  const startTime = Date.now();

  // Log incoming request
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  // Log response when it's sent
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusColor = res.statusCode >= 500 ? '\x1b[31m' : // Red
                        res.statusCode >= 400 ? '\x1b[33m' : // Yellow
                        res.statusCode >= 300 ? '\x1b[36m' : // Cyan
                        '\x1b[32m'; // Green
    
    console.log(
      `${statusColor}[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} - ${duration}ms\x1b[0m`
    );
  });

  next();
};

module.exports = logger;
