/**
 * Authentication and Login API Endpoints
 * @module routes/login
 */

const express = require('express');
const router = express.Router();
const pool = require('../database');
const bcrypt = require('bcrypt');
const salt = require('../salt'); // Import the salt value

/**
 * Authenticate user credentials and perform login.
 *
 * This route allows authentication of user credentials by hashing the provided password
 * and comparing it to the stored hashed password in the database. Upon successful authentication,
 * the user data is returned, and an access token can be generated and used for subsequent requests.
 *
 * @name POST /api/login
 * @function
 * @memberof module:routes/login
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} HTTP response object containing the authenticated user's data.
 * @throws {Object} HTTP response object with an error message in case of failure.
 */
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

    if (user) {
      // User record exists
      res.status(200).json({ user }); // Send back the user object
    } else {
      // User not found or invalid credentials
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

// Export the router to be used in other parts of the application
module.exports = router;
