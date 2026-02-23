/**
 * Routes Module
 * Exports all route creators
 */

const createCounterRoutes = require('./counterRoutes');
const createHealthRoutes = require('./healthRoutes');

module.exports = {
  createCounterRoutes,
  createHealthRoutes
};
