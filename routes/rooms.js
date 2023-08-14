/**
 * Room Management API Endpoints
 * @module routes/rooms
 */

const express = require('express');
const router = express.Router();
const pool = require('../database');

/**
 * Create a new room.
 *
 * This route creates a new room in the database using the provided data.
 *
 * @name POST /api/rooms
 * @function
 * @memberof module:routes/rooms
 * @param {string} pNumber - Room number.
 * @param {string} pBuilding - Building of the room.
 * @returns {Object} HTTP response object containing a success message.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.post('/', (req, res) => {
  const { pNumber, pBuilding } = req.body;

  // Execute the stored procedure query
  pool.query('CALL CreateRoom(?, ?)', [pNumber, pBuilding], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Respond with success message or any other desired response
    res.status(200).json({ message: 'Room created successfully!' });
  });
});

/**
 * Retrieve room entries based on optional filter.
 *
 * This route fetches room data from the database, optionally filtered by room IDs,
 * and returns the resulting data in JSON format.
 *
 * @name GET /api/rooms/:Rooms?
 * @function
 * @memberof module:routes/rooms
 * @param {string} Rooms - Optional. Comma-separated list of room IDs to retrieve.
 * @returns {Object} HTTP response object containing an array of room entries.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.get('/:Rooms?', (req, res) => {
  const IDs = req.params.Rooms || '';

  // Execute the stored procedure query
  pool.query('CALL GetRooms(?)', [IDs], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Process the query results
    const rooms = results[0];
    res.status(200).json(rooms);
  });
});

/**
 * Update an existing room entry.
 *
 * This route updates an existing room entry in the database with new data.
 *
 * @name PUT /api/rooms/:id
 * @function
 * @memberof module:routes/rooms
 * @param {number} id - ID of the room entry to update.
 * @param {string} Number - New room number.
 * @param {string} Building - New building of the room.
 * @returns {Object} HTTP response object containing a success message.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.put('/:id', (req, res) => {
  const pID = req.params.id || '';
  const { Number, Building } = req.body;

  // Execute the stored procedure query to update the room
  pool.query('CALL UpdateRoom(?, ?, ?)', [pID, Number, Building], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Respond with success message or any other desired response
    res.status(200).json({ message: 'Room updated successfully!' });
  });
});

/**
 * Delete a room entry.
 *
 * This route deletes a room entry from the database based on the provided room ID.
 *
 * @name DELETE /api/rooms/:id
 * @function
 * @memberof module:routes/rooms
 * @param {number} id - ID of the room entry to delete.
 * @returns {Object} HTTP response object containing a success message.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
router.delete('/:id', (req, res) => {
  const pID = req.params.id || ''; // Access room ID from URL parameter

  // Execute the stored procedure query to delete the room
  pool.query('CALL DeleteRoom(?)', [pID], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Respond with success message or any other desired response
    res.status(200).json({ message: 'Room deleted successfully!' });
  });
});

// Export the router to be used in other parts of the application
module.exports = router;
