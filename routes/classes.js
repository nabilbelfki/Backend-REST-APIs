const express = require('express');
const router = express.Router();
const pool = require('../database');

// Create Class
router.post('/', (req, res) => {
  const { Name, Description } = req.body;

  // Execute the stored procedure query
  pool.query(
    'CALL CreateClass(?,?)',
    [Name,Description],
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

// Read Class
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

// Update Class
router.put('/:id', (req, res) => {
  const classID = req.params.id || '';
  const { Name,Description } = req.body;

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

// Delete Class
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


module.exports = router;