/**
 * Registration Management API Endpoints
 * @module routes/registration
 */

const express = require('express');
const router = express.Router();
const pool = require('../database');

/**
 * Create a new registration.
 *
 * This route creates a new registration in the database using the provided data.
 *
 * @name POST /api/registration
 * @function
 * @memberof module:routes/registration
 * @param {number} MemberID - ID of the member registering.
 * @param {number} ScheduleID - ID of the schedule being registered for.
 * @returns {Object} HTTP response object containing a success message.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.post('/', (req, res) => {
  const { MemberID, ScheduleID } = req.body;

  // Execute the stored procedure query
  pool.query(
    'CALL CreateRegistration(?, ?)',
    [MemberID, ScheduleID],
    (error, results) => {
      if (error) {
        console.error('Error executing the stored procedure:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      // Respond with success message or any other desired response
      res.status(200).json({ message: 'Registration created successfully!' });
    }
  );
});

/**
 * Retrieve registration entries based on optional filter.
 *
 * This route fetches registration data from the database, optionally filtered by
 * registration IDs, member IDs, and schedule IDs, and returns the resulting data in JSON format.
 *
 * @name GET /api/registration/:IDs?/:Members?/:Schedule?
 * @function
 * @memberof module:routes/registration
 * @param {string} IDs - Optional. Comma-separated list of registration IDs to retrieve.
 * @param {string} Members - Optional. Comma-separated list of member IDs to retrieve registrations for.
 * @param {string} Schedule - Optional. Comma-separated list of schedule IDs to retrieve registrations for.
 * @returns {Object} HTTP response object containing an array of registration entries.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.get('/:IDs?/:Members?/:Schedule?', (req, res) => {
  const IDs = req.query.IDs || '';
  const Members = req.query.Members || '';
  const Schedule = req.query.Schedule || '';

  // Execute the stored procedure query
  pool.query('CALL GetRegistration(?,?,?)', [IDs, Members, Schedule], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Process the query results
    const registration = results[0];
    res.status(200).json(registration);
  });
});

/**
 * Update an existing registration entry.
 *
 * This route updates an existing registration entry in the database with new data.
 *
 * @name PUT /api/registration/registration/:id
 * @function
 * @memberof module:routes/registration
 * @param {number} id - ID of the registration entry to update.
 * @param {number} MemberID - New member ID.
 * @param {number} ScheduleID - New schedule ID.
 * @param {boolean} Registered - New registration status.
 * @returns {Object} HTTP response object containing a success message.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.put('/registration/:id', (req, res) => {
  const registrationID = req.params.id || '';
  const { MemberID, ScheduleID, Registered } = req.body;

  // Execute the stored procedure query to update the registration
  pool.query(
    'CALL UpdateRegistration(?, ?, ?, ?)',
    [registrationID, MemberID, ScheduleID, Registered],
    (error, results) => {
      if (error) {
        console.error('Error executing the stored procedure:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      // Respond with success message or any other desired response
      res.status(200).json({ message: 'Registration updated successfully!' });
    }
  );
});

/**
 * Delete a registration entry.
 *
 * This route deletes a registration entry from the database based on the provided registration ID.
 *
 * @name DELETE /api/registration/:id
 * @function
 * @memberof module:routes/registration
 * @param {number} id - ID of the registration entry to delete.
 * @returns {Object} HTTP response object containing a success message.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.delete('/:id', (req, res) => {
  const pID = req.params.id || ''; // Access registration ID from URL parameter

  // Execute the stored procedure query to delete the registration
  pool.query('CALL DeleteRegistration(?)', [pID], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Respond with success message or any other desired response
    res.status(200).json({ message: 'Registration deleted successfully!' });
  });
});

// Export the router to be used in other parts of the application
module.exports = router;
