/**
 * Instructor Management API Endpoints
 * @module routes/instructors
 */

const express = require('express');
const router = express.Router();
const pool = require('../database');

/**
 * Create a new instructor.
 *
 * This route allows the creation of a new instructor record by providing necessary information.
 *
 * @name POST /api/instructors
 * @function
 * @memberof module:routes/instructors
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} HTTP response object indicating the success of the operation.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.post('/', (req, res) => {
  const { Type, FirstName, LastName, Salary, Hours, Rate } = req.body;

  // Execute the stored procedure query
  pool.query(
    'CALL CreateInstructor(?, ?, ?, ?, ?, ?)',
    [Type, FirstName, LastName, Salary, Hours, Rate],
    (error, results) => {
      if (error) {
        console.error('Error executing the stored procedure:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      // Respond with success message or any other desired response
      res.json({ message: 'Instructor created successfully!' });
    }
  );
});

/**
 * Retrieve instructor information.
 *
 * This route retrieves instructor information based on the provided parameters.
 *
 * @name GET /api/instructors/:Instructors?
 * @function
 * @memberof module:routes/instructors
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} HTTP response object containing instructor information.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.get('/:Instructors?', (req, res) => {
  const IDs = req.params.Instructors || '';

  // Execute the stored procedure query
  pool.query('CALL GetInstructors(?)', [IDs], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Process the query results
    const instructors = results[0];
    res.json(instructors);
  });
});

/**
 * Update instructor information.
 *
 * This route allows updating instructor information based on the provided data.
 *
 * @name PUT /api/instructors/instructors/:id
 * @function
 * @memberof module:routes/instructors
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} HTTP response object indicating the success of the operation.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.put('/instructors/:id', (req, res) => {
  const instructorID = req.params.id || '';
  const { Type, FirstName, LastName } = req.body;

  console.log('Updating instructor with ID:', instructorID);
  console.log('Updated instructor data:', Type, FirstName, LastName);

  // Execute the stored procedure query to update the instructor
  pool.query(
    'CALL UpdateInstructor(?, ?, ?, ?)',
    [instructorID, Type, FirstName, LastName],
    (error, results) => {
      if (error) {
        console.error('Error executing the stored procedure:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      console.log('Instructor updated successfully!');
      // Respond with success message or any other desired response
      res.json({ message: 'Instructor updated successfully!' });
    }
  );
});

/**
 * Delete an instructor.
 *
 * This route allows deleting an instructor based on the provided ID.
 *
 * @name DELETE /api/instructors/:id
 * @function
 * @memberof module:routes/instructors
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} HTTP response object indicating the success of the operation.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.delete('/:id', (req, res) => {
  const pID = req.params.id || ''; // Access instructor ID from URL parameter

  // Execute the stored procedure query to delete the instructor
  pool.query('CALL DeleteInstructor(?)', [pID], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Respond with success message or any other desired response
    res.json({ message: 'Instructor deleted successfully!' });
  });
});

// Export the router to be used in other parts of the application
module.exports = router;
