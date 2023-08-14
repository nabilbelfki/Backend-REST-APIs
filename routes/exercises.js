/**
 * Exercise Management API Endpoints
 * @module routes/exercises
 */

const express = require('express');
const router = express.Router();
const pool = require('../database');

/**
 * Create a new exercise.
 *
 * This route allows the creation of a new exercise record by providing necessary information.
 *
 * @name POST /api/exercises/exercises
 * @function
 * @memberof module:routes/exercises
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} HTTP response object indicating the success of the operation.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.post('/exercises', (req, res) => {
  const { Name } = req.body;

  // Execute the stored procedure query
  pool.query(
    'CALL CreateExercise(?)',
    [Name],
    (error, results) => {
      if (error) {
        console.error('Error executing the stored procedure:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      // Respond with success message or any other desired response
      res.json({ message: 'Exercise created successfully!' });
    }
  );
});

/**
 * Retrieve exercise information.
 *
 * This route retrieves exercise information based on the provided parameters.
 *
 * @name GET /api/exercises/:Exercises?
 * @function
 * @memberof module:routes/exercises
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} HTTP response object containing exercise information.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.get('/:Exercises?', (req, res) => {
  const IDs = req.params.Exercises || '';

  // Execute the stored procedure query
  pool.query('CALL GetExercises(?)', [IDs], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Process the query results
    const exercises = results[0];
    res.json(exercises);
  });
});

/**
 * Update exercise information.
 *
 * This route allows updating exercise information based on the provided data.
 *
 * @name PUT /api/exercises/exercises/:id
 * @function
 * @memberof module:routes/exercises
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} HTTP response object indicating the success of the operation.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.put('/exercises/:id', (req, res) => {
  const exerciseID = req.params.id || '';
  const { Name } = req.body;

  console.log('Updating exercise with ID:', exerciseID);
  console.log('Updated exercise data:', Name);

  // Execute the stored procedure query to update the exercise
  pool.query(
    'CALL UpdateExercise(?, ?)',
    [exerciseID, Name],
    (error, results) => {
      if (error) {
        console.error('Error executing the stored procedure:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      console.log('Exercise updated successfully!');
      // Respond with success message or any other desired response
      res.json({ message: 'Exercise updated successfully!' });
    }
  );
});

/**
 * Delete an exercise.
 *
 * This route allows deleting an exercise based on the provided ID.
 *
 * @name DELETE /api/exercises/exercise/:id
 * @function
 * @memberof module:routes/exercises
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} HTTP response object indicating the success of the operation.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.delete('/exercise/:id', (req, res) => {
  const pID = req.params.id || ''; // Access exercise ID from URL parameter

  // Execute the stored procedure query to delete the exercise
  pool.query('CALL DeleteExercise(?)', [pID], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Respond with success message or any other desired response
    res.json({ message: 'Exercise deleted successfully!' });
  });
});

// Export the router to be used in other parts of the application
module.exports = router;
