/**
 * Wages Management API Endpoints
 * @module routes/wages
 */

const express = require('express');
const router = express.Router();
const pool = require('../database');

/**
 * Retrieve wage information based on optional filter.
 *
 * This route fetches wage information from the database, optionally filtered by wage IDs,
 * and returns the resulting data in JSON format.
 *
 * @name GET /api/wages/:Wages?
 * @function
 * @memberof module:routes/wages
 * @param {string} Wages - Optional. Comma-separated list of wage IDs to retrieve.
 * @returns {Object} HTTP response object containing an array of wage information.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.get('/:Wages?', (req, res) => {
  const IDs = req.params.Wages || '';

  // Execute the stored procedure query
  pool.query('CALL GetWages(?)', [IDs], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Process the query results
    const wages = results[0];
    res.status(200).json(wages);
  });
});

// Export the router to be used in other parts of the application
module.exports = router;
