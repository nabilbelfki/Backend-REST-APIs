/**
 * Schedule Management API Endpoints
 * @module routes/schedule
 */

const express = require('express');
const router = express.Router();
const pool = require('../database');

/**
 * Create a new schedule entry.
 *
 * This route creates a new schedule entry in the database using the provided data.
 *
 * @name POST /api/schedule
 * @function
 * @memberof module:routes/schedule
 * @param {number} ClassID - ID of the class for the schedule.
 * @param {number} InstructorID - ID of the instructor for the schedule.
 * @param {number} RoomID - ID of the room for the schedule.
 * @param {string} StartTime - Start time of the schedule entry.
 * @param {number} Duration - Duration of the schedule entry.
 * @returns {Object} HTTP response object containing a success message.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
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
      res.status(200).json({ message: 'Schedule created successfully!' });
    }
  );
});

/**
 * Retrieve schedule entries based on various filters.
 *
 * This route fetches schedule data from the database, optionally filtered by class, instructor, and room,
 * and returns the resulting data in JSON format.
 *
 * @name GET /api/schedule/:IDs?/:Classes?/:Instructors?/:Rooms?
 * @function
 * @memberof module:routes/schedule
 * @param {string} IDs - Optional. Comma-separated list of schedule IDs to retrieve.
 * @param {string} Classes - Optional. Comma-separated list of class IDs to filter the schedule.
 * @param {string} Instructors - Optional. Comma-separated list of instructor IDs to filter the schedule.
 * @param {string} Rooms - Optional. Comma-separated list of room IDs to filter the schedule.
 * @returns {Object} HTTP response object containing an array of schedule entries.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
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
    res.status(200).json(schedule);
  });
});

/**
 * Update an existing schedule entry.
 *
 * This route updates an existing schedule entry in the database with new data.
 *
 * @name PUT /api/schedule/schedule/:id
 * @function
 * @memberof module:routes/schedule
 * @param {number} id - ID of the schedule entry to update.
 * @param {number} ClassID - New class ID for the schedule.
 * @param {number} InstructorID - New instructor ID for the schedule.
 * @param {number} RoomID - New room ID for the schedule.
 * @param {string} StartTime - New start time for the schedule entry.
 * @param {number} Duration - New duration for the schedule entry.
 * @returns {Object} HTTP response object containing a success message.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.put('/schedule/:id', (req, res) => {
  const scheduleID = req.params.id || '';
  const { ClassID, InstructorID, RoomID, StartTime, Duration } = req.body;

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

      // Respond with success message or any other desired response
      res.status(200).json({ message: 'Schedule updated successfully!' });
    }
  );
});

/**
 * Delete a schedule entry.
 *
 * This route deletes a schedule entry from the database based on the provided schedule ID.
 *
 * @name DELETE /api/schedule/schedule/:id
 * @function
 * @memberof module:routes/schedule
 * @param {number} id - ID of the schedule entry to delete.
 * @returns {Object} HTTP response object containing a success message.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.delete('/schedule/:id', (req, res) => {
  const scheduleID = req.params.id || ''; // Access schedule ID from URL parameter

  // Execute the stored procedure query to delete the schedule
  pool.query('CALL DeleteSchedule(?)', [scheduleID], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Respond with success message or any other desired response
    res.status(200).json({ message: 'Schedule deleted successfully!' });
  });
});

// Export the router to be used in other parts of the application
module.exports = router;
