/**
 * Counter Routes
 * Defines all counter-related routes
 * Express.js Best Practice: Separate route definitions from controllers
 */

const express = require('express');
const CounterController = require('../controllers/CounterController');

/**
 * Creates counter routes
 * @param {CounterController} counterController - The counter controller instance
 * @returns {express.Router} The configured router
 */
const createCounterRoutes = (counterController) => {
  const router = express.Router();

  // GET /count.svg - Get counter SVG image
  router.get('/count.svg', (req, res, next) => {
    counterController.getCounterSVG(req, res, next);
  });

  return router;
};

module.exports = createCounterRoutes;
