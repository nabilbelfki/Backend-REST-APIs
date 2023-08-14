/**
 * ClassExercise Management API Endpoints
 * @module routes/classexercises
 */

const express = require('express');
const router = express.Router();
const pool = require('../database');

/**
 * Create a new class exercise.
 *
 * This route allows the creation of a new class exercise record by providing exercise and class IDs.
 *
 * @name POST /api/classexercises/classexercises
 * @function
 * @memberof module:routes/classexercises
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} HTTP response object indicating the success of the operation.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.post('/classexercises', (req, res) => {
  const { ExerciseID, ClassID } = req.body;
  console.log("Exercises" + ExerciseID);
  console.log("ClassID" + ClassID);
  // Execute the stored procedure query
  pool.query(
    'CALL CreateClassExercise(?, ?)',
    [ExerciseID, ClassID],
    (error, results) => {
      if (error) {
        console.error('Error executing the stored procedure:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      // Respond with success message or any other desired response
      res.json({ message: 'ClassExercise created successfully!' });
    }
  );
});

/**
 * Retrieve class exercise information.
 *
 * This route retrieves class exercise information based on provided exercise and class IDs.
 *
 * @name GET /api/classexercises/
 * @function
 * @memberof module:routes/classexercises
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} HTTP response object containing class exercise information.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.get('/', (req, res) => {
  const Exercises = req.query.Exercises || ''; // If Exercises is undefined, set it to an empty string
  const Classes = req.query.Classes || '';
  console.log('Exercises:', Exercises);
  console.log('Classes:', Classes);
  // Execute the stored procedure query
  pool.query('CALL GetClassExercises(?, ?)', [Exercises, Classes], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Process the query results
    const classexercises = results[0];
    console.log(classexercises);
    res.json(classexercises);
  });
});

/**
 * Update class exercise information.
 *
 * This route allows updating class exercise information based on provided data.
 *
 * @name PUT /api/classexercises/classexercises/:oldExerciseID/:oldClassID
 * @function
 * @memberof module:routes/classexercises
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} HTTP response object indicating the success of the operation.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.put('/classexercises/:oldExerciseID/:oldClassID', (req, res) => {
  const oldExerciseID = req.params.oldExerciseID || '';
  const oldClassID = req.params.oldClassID || '';
  const { newExerciseID, newClassID } = req.body;

  console.log('Updating ClassExercises with old ExerciseID:', oldExerciseID, 'and old ClassID:', oldClassID);
  console.log('Updated ClassExercises data:', newExerciseID, newClassID);

  // Execute the stored procedure query to update the ClassExercises
  pool.query(
    'CALL UpdateClassExercises(?, ?, ?, ?)',
    [oldExerciseID, oldClassID, newExerciseID, newClassID],
    (error, results) => {
      if (error) {
        console.error('Error executing the stored procedure:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      console.log('ClassExercises updated successfully!');
      // Respond with success message or any other desired response
      res.json({ message: 'ClassExercises updated successfully!' });
    }
  );
});

/**
 * Delete a class exercise.
 *
 * This route allows deleting a class exercise based on the provided exercise and class IDs.
 *
 * @name DELETE /api/classexercises/classexercise/:exerciseID/:classID
 * @function
 * @memberof module:routes/classexercises
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} HTTP response object indicating the success of the operation.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.delete('/classexercise/:exerciseID/:classID', (req, res) => {
  const exerciseID = req.params.exerciseID || '';
  const classID = req.params.classID || '';

  // Execute the stored procedure query to delete the ClassExercise
  pool.query('CALL DeleteClassExercise(?, ?)', [exerciseID, classID], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Respond with success message or any other desired response
    res.json({ message: 'ClassExercise deleted successfully!' });
  });
});

// Export the router to be used in other parts of the application
module.exports = router;
