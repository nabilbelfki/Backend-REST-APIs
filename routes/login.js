const express = require('express');
const router = express.Router();
const pool = require('../database');
const bcrypt = require('bcrypt');
const salt = require('../salt'); // Import the salt value

router.post('/', (req, res) => {
  const { pUsername, pPassword } = req.body;

  // Hash the password with the hardcoded salt
  const hashedPassword = bcrypt.hashSync(pPassword, salt);

  // Call the Login stored procedure with the hashed password
  pool.query('CALL Login(?, ?)', [pUsername, hashedPassword], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Process the query results
    const user = results[0][0]; // Assuming the first row contains the user data

    console.log(user)

    if (user) {
        // User record exists
        res.json({ user }); // Send back the user object
      } else {
        // User not found or invalid credentials
        res.status(401).json({ error: 'Invalid username or password' });
      }
  });
});

module.exports = router;
