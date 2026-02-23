/**
 * Health Check Routes
 * Provides health check endpoint for monitoring
 * Express.js Best Practice: Health check endpoint for load balancers and monitoring
 */

const express = require('express');
const { HTTP_STATUS } = require('../config');

/**
 * Creates health check routes
 * @returns {express.Router} The configured router
 */
const createHealthRoutes = () => {
  const router = express.Router();

  // GET /health - Health check endpoint
  router.get('/health', (req, res) => {
    res.status(HTTP_STATUS.OK).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  return router;
};

module.exports = createHealthRoutes;
