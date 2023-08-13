const express = require('express');
const router = express.Router();
const pool = require('../database');

// Create Exercise
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

// Read Exercises
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

// Update Exercise
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

// Delete Exercise
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

module.exports = router;