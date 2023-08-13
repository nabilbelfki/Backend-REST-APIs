const express = require('express');
const router = express.Router();
const pool = require('../database');

// Create Instructor
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

// Read Instructors
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

// Update Instructor
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

// Delete Instructor
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


module.exports = router;