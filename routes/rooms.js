const express = require('express');
const router = express.Router();
const pool = require('../database');

// Create Room
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
    res.json({ message: 'Room created successfully!' });
  });
});

// Read Rooms
router.get('/:Rooms?', (req, res) => {
  const IDs = req.query.Rooms || '';
  console.log(IDs)
  // Execute the stored procedure query
  pool.query('CALL GetRooms(?)', [IDs], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Process the query results
    const rooms = results[0];
    res.json(rooms);
  });
});

//Update Room
router.put('/:id', (req, res) => {
  const pID = req.params.id || '';
  const { Number, Building } = req.body; // Fix the property names here

  console.log('Updating room with ID:', pID);
  console.log('Updated room data:', Number, Building);

  // Execute the stored procedure query to update the room
  pool.query('CALL UpdateRoom(?, ?, ?)', [pID, Number, Building], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    console.log('Room updated successfully!');
    // Respond with success message or any other desired response
    res.json({ message: 'Room updated successfully!' });
  });
});


// Delete Room
router.delete('/:id', (req, res) => {
  const pID = req.params.id || ''; // Access room ID from URL parameter
  console.log(pID);
  // Execute the stored procedure query to delete the room
  pool.query('CALL DeleteRoom(?)', [pID], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Respond with success message or any other desired response
    res.json({ message: 'Room deleted successfully!' });
  });
});



module.exports = router;