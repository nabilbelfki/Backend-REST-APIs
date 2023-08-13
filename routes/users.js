const express = require('express');
const router = express.Router();
const pool = require('../database');
const bcrypt = require('bcrypt');
const salt = require('../salt');

router.post('/', (req, res) => {
  const { firstname, lastname, phone, username, email, password } = req.body;

  // Hash the password with the hardcoded salt
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Execute the stored procedure to create a user with the hashed password
  pool.query(
    'CALL CreateUser(?, ?, ?, ?, ?, ?)',
    [firstname, lastname, phone, username, email, hashedPassword],
    (error, results) => {
      if (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      // User created successfully
      res.status(201).json({ message: 'User created successfully' });
    }
  );
});

module.exports = router;
