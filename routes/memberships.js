/**
 * Memberships Management API Endpoints
 * @module routes/memberships
 */

const express = require('express');
const router = express.Router();
const pool = require('../database');

/**
 * Retrieve membership information based on optional filter.
 *
 * This route fetches membership information from the database, optionally filtered by membership IDs,
 * and returns the resulting data in JSON format.
 *
 * @name GET /api/memberships/:Memberships?
 * @function
 * @memberof module:routes/memberships
 * @param {string} Memberships - Optional. Comma-separated list of membership IDs to retrieve.
 * @returns {Object} HTTP response object containing an array of membership information.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.get('/:Memberships?', (req, res) => {
  const IDs = req.params.Memberships || '';

  // Execute the stored procedure query
  pool.query('CALL GetMemberships(?)', [IDs], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Process the query results
    const memberships = results[0];
    res.status(200).json(memberships);
  });
});

// Export the router to be used in other parts of the application
module.exports = router;
