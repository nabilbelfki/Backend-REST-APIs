/**
 * Class Management API Endpoints
 * @module routes/classes
 */

const express = require('express');
const router = express.Router();
const pool = require('../database');

/**
 * Create a new class.
 *
 * This route allows the creation of a new class by providing a name and description.
 *
 * @name POST /api/classes/
 * @function
 * @memberof module:routes/classes
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} HTTP response object indicating the success of the operation.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.post('/', (req, res) => {
  const { Name, Description } = req.body;

  // Execute the stored procedure query
  pool.query(
    'CALL CreateClass(?, ?)',
    [Name, Description],
    (error, results) => {
      if (error) {
        console.error('Error executing the stored procedure:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      // Respond with success message or any other desired response
      res.json({ message: 'Class created successfully!' });
    }
  );
});

/**
 * Retrieve class information.
 *
 * This route retrieves class information based on provided class IDs.
 *
 * @name GET /api/classes/:Classes?
 * @function
 * @memberof module:routes/classes
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} HTTP response object containing class information.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.get('/:Classes?', (req, res) => {
  const IDs = req.query.Classes || '';

  // Execute the stored procedure query
  pool.query('CALL GetClasses(?)', [IDs], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Process the query results
    const classes = results[0];
    res.json(classes);
  });
});

/**
 * Update class information.
 *
 * This route allows updating class information based on provided data.
 *
 * @name PUT /api/classes/:id
 * @function
 * @memberof module:routes/classes
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} HTTP response object indicating the success of the operation.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.put('/:id', (req, res) => {
  const classID = req.params.id || '';
  const { Name, Description } = req.body;

  console.log('Updating class with ID:', classID);
  console.log('Updated class data:', Name);

  // Execute the stored procedure query to update the class
  pool.query(
    'CALL UpdateClass(?, ?, ?)',
    [classID, Name, Description],
    (error, results) => {
      if (error) {
        console.error('Error executing the stored procedure:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      console.log('Class updated successfully!');
      // Respond with success message or any other desired response
      res.json({ message: 'Class updated successfully!' });
    }
  );
});

/**
 * Delete a class.
 *
 * This route allows deleting a class based on the provided class ID.
 *
 * @name DELETE /api/classes/:id
 * @function
 * @memberof module:routes/classes
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} HTTP response object indicating the success of the operation.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.delete('/:id', (req, res) => {
  const pID = req.params.id || ''; // Access class ID from URL parameter

  // Execute the stored procedure query to delete the class
  pool.query('CALL DeleteClass(?)', [pID], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Respond with success message or any other desired response
    res.json({ message: 'Class deleted successfully!' });
  });
});

// Export the router to be used in other parts of the application
module.exports = router;
