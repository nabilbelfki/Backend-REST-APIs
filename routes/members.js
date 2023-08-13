const express = require('express');
const router = express.Router();
const pool = require('../database');

// Create Member
router.post('/', (req, res) => {
  const { Type, FirstName, LastName, Address, City, State, Zipcode, Country } = req.body;

  // Execute the stored procedure query
  pool.query(
    'CALL CreateMember(?, ?, ?, ?, ?, ?, ?, ?)',
    [Type, FirstName, LastName, Address, City, State, Zipcode, Country],
    (error, results) => {
      if (error) {
        console.error('Error executing the stored procedure:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      // Respond with success message or any other desired response
      res.json({ message: 'Member created successfully!' });
    }
  );
});

// Read Members
router.get('/:Members?', (req, res) => {
  const memberId = req.query.Members || '';
  console.log('SQL Query:', 'CALL GetMembers(?)', [memberId]); // Add this line to log the SQL query
  // Execute the stored procedure query
  pool.query('CALL GetMembers(?)', [memberId], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Process the query results
    const members = results[0];
    res.json(members);
  });
});

// Update Member
router.put('/:id', (req, res) => {
  const memberID = req.params.id || '';
  const { Type, FirstName, LastName, Address, City, State, Zipcode, Country } = req.body;

  console.log('Updating member with ID:', memberID);
  console.log('Updated member data:', Type, FirstName, LastName, Address, City, State, Zipcode, Country);

  // Execute the stored procedure query to update the member
  pool.query(
    'CALL UpdateMember(?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [memberID, Type, FirstName, LastName, Address, City, State, Zipcode, Country],
    (error, results) => {
      if (error) {
        console.error('Error executing the stored procedure:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      console.log('Member updated successfully!');
      // Respond with success message or any other desired response
      res.json({ message: 'Member updated successfully!' });
    }
  );
});

// Delete Member
router.delete('/:Member', (req, res) => {
  console.log(req.params.Member);
  const ID = parseInt(req.params.Member); // Parse the ID to an integer
  // Check if the ID is a valid integer
  if (isNaN(ID)) {
    res.status(400).json({ error: 'Invalid member ID' });
    return;
  }

  // Execute the stored procedure query to delete the member
  pool.query('CALL DeleteMember(?)', [ID], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Respond with success message or any other desired response
    res.json({ message: 'Member deleted successfully!' });
  });
});


module.exports = router;