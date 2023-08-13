const express = require('express');
const router = express.Router();
const pool = require('../database');

// Create Schedule
router.post('/', (req, res) => {
  const { ClassID, InstructorID, RoomID, StartTime, Duration } = req.body;

  // Execute the stored procedure query
  pool.query(
    'CALL CreateSchedule(?, ?, ?, ?, ?)',
    [ClassID, InstructorID, RoomID, StartTime, Duration],
    (error, results) => {
      if (error) {
        console.error('Error executing the stored procedure:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      // Respond with success message or any other desired response
      res.json({ message: 'Schedule created successfully!' });
    }
  );
});

//Read Schedule
router.get('/:IDs?/:Classes?/:Instructors?/:Rooms?', (req, res) => {
  const IDs = req.params.IDs || '';
  const Classes = req.params.Classes || '';
  const Instructors = req.params.Instructors || '';
  const Rooms = req.params.Rooms || '';

  // Execute the stored procedure query
  pool.query('CALL GetSchedule(?,?,?,?)', [IDs, Classes, Instructors, Rooms], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Process the query results
    const schedule = results[0];
    res.json(schedule);
  });
});

// Update Schedule
router.put('/schedule/:id', (req, res) => {
  const scheduleID = req.params.id || '';
  const { ClassID, InstructorID, RoomID, StartTime, Duration } = req.body;

  console.log('Updating schedule with ID:', scheduleID);
  console.log('Updated schedule data:', ClassID, InstructorID, RoomID, StartTime, Duration);

  // Execute the stored procedure query to update the schedule
  pool.query(
    'CALL UpdateSchedule(?, ?, ?, ?, ?, ?)',
    [scheduleID, ClassID, InstructorID, RoomID, StartTime, Duration],
    (error, results) => {
      if (error) {
        console.error('Error executing the stored procedure:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      console.log('Schedule updated successfully!');
      // Respond with success message or any other desired response
      res.json({ message: 'Schedule updated successfully!' });
    }
  );
});

// Delete Schedule
router.delete('/schedule/:id', (req, res) => {
  const pID = req.params.id || ''; // Access schedule ID from URL parameter

  // Execute the stored procedure query to delete the schedule
  pool.query('CALL DeleteSchedule(?)', [pID], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Respond with success message or any other desired response
    res.json({ message: 'Schedule deleted successfully!' });
  });
});


module.exports = router;