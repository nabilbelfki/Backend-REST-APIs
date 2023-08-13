const express = require('express');
const router = express.Router();
const pool = require('../database');

// Create Registration
router.post('/', (req, res) => {
  const { MemberID, ScheduleID} = req.body;

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
      res.json({ message: 'Registration created successfully!' });
    }
  );
});

// Read Registrations
router.get('/:IDs?/:Members?/:Schedule?', (req, res) => {
  const IDs = req.query.IDs || '';
  const Members = req.query.Members || '';
  const Schedule = req.query.Schedule || '';

  console.log('Received GET request with the following parameters:');
  console.log('IDs:', IDs);
  console.log('Members:', Members);
  console.log('Schedule:', Schedule);

  // Execute the stored procedure query
  pool.query('CALL GetRegistration(?,?,?)', [IDs, Members, Schedule], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Process the query results
    const registration = results[0];
    res.json(registration);
  });
});


// Update Registration
router.put('/registration/:id', (req, res) => {
  const registrationID = req.params.id || '';
  const { MemberID, ScheduleID, Registered } = req.body;

  console.log('Updating registration with ID:', registrationID);
  console.log('Updated registration data:', MemberID, ScheduleID, Registered);

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

      console.log('Registration updated successfully!');
      // Respond with success message or any other desired response
      res.json({ message: 'Registration updated successfully!' });
    }
  );
});

// Delete Registration
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
    res.json({ message: 'Registration deleted successfully!' });
  });
});

module.exports = router;