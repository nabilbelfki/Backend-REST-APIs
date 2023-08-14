/**
 * Members Management API Endpoints
 * @module routes/members
 */

const express = require('express');
const router = express.Router();
const pool = require('../database');

/**
 * Create a new member.
 *
 * This route allows the creation of a new member by providing member details,
 * which are then stored in the database.
 *
 * @name POST /api/members
 * @function
 * @memberof module:routes/members
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} HTTP response object indicating the success of the member creation.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.post('/', (req, res) => {
  const { Type, FirstName, LastName, Address, City, State, Zipcode, Country } = req.body;

  // Execute the stored procedure query
  pool.query(
    'CALL CreateMember(?, ?, ?, ?, ?, ?, ?, ?)',
    [Type, FirstName, LastName, Address, City, State, Zipcode, Country],
    (error, results) => {
      if (error) {
        console.error('Error executing the stored procedure:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      // Respond with success message
      res.status(201).json({ message: 'Member created successfully!' });
    }
  );
});

/**
 * Retrieve member information based on optional filter.
 *
 * This route fetches member information from the database, optionally filtered by member IDs,
 * and returns the resulting data in JSON format.
 *
 * @name GET /api/members/:Members?
 * @function
 * @memberof module:routes/members
 * @param {string} Members - Optional. Comma-separated list of member IDs to retrieve.
 * @returns {Object} HTTP response object containing an array of member information.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.get('/:Members?', (req, res) => {
  const memberId = req.query.Members || '';

  // Execute the stored procedure query
  pool.query('CALL GetMembers(?)', [memberId], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Process the query results
    const members = results[0];
    res.status(200).json(members);
  });
});

/**
 * Update member information.
 *
 * This route allows updating member information by providing member ID and updated details.
 *
 * @name PUT /api/members/:id
 * @function
 * @memberof module:routes/members
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} HTTP response object indicating the success of the member update.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.put('/:id', (req, res) => {
  const memberID = req.params.id || '';
  const { Type, FirstName, LastName, Address, City, State, Zipcode, Country } = req.body;

  // Execute the stored procedure query to update the member
  pool.query(
    'CALL UpdateMember(?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [memberID, Type, FirstName, LastName, Address, City, State, Zipcode, Country],
    (error, results) => {
      if (error) {
        console.error('Error executing the stored procedure:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      // Respond with success message
      res.status(200).json({ message: 'Member updated successfully!' });
    }
  );
});

/**
 * Delete a member.
 *
 * This route allows the deletion of a member by providing the member ID.
 *
 * @name DELETE /api/members/:Member
 * @function
 * @memberof module:routes/members
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} HTTP response object indicating the success of the member deletion.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.delete('/:Member', (req, res) => {
  const ID = parseInt(req.params.Member); // Parse the ID to an integer

  // Check if the ID is a valid integer
  if (isNaN(ID)) {
    res.status(400).json({ error: 'Invalid member ID' });
    return;
  }

  // Execute the stored procedure query to delete the member
  pool.query('CALL DeleteMember(?)', [ID], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Respond with success message
    res.status(200).json({ message: 'Member deleted successfully!' });
  });
});

// Export the router to be used in other parts of the application
module.exports = router;
