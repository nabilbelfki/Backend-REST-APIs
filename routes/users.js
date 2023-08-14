/**
 * User Registration API Endpoint
 * @module routes/users
 */

const express = require('express');
const router = express.Router();
const pool = require('../database');
const bcrypt = require('bcrypt');
const salt = require('../salt');

/**
 * Create a new user.
 *
 * This route handles the registration of a new user by accepting user data
 * and securely storing it in the database after hashing the password.
 *
 * @name POST /api/users
 * @function
 * @memberof module:routes/users
 * @param {string} firstname - The first name of the user.
 * @param {string} lastname - The last name of the user.
 * @param {string} phone - The phone number of the user.
 * @param {string} username - The desired username for the user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The plain-text password of the user.
 * @returns {Object} HTTP response object containing the result of the registration process.
 * @throws {Object} HTTP response object with an error message in case of failure.
 * @example
 * // Request
 * POST /api/users
 * {
 *   "firstname": "John",
 *   "lastname": "Doe",
 *   "phone": "123-456-7890",
 *   "username": "johndoe",
 *   "email": "john@example.com",
 *   "password": "secretpassword"
 * }
 *
 * // Response (Success)
 * Status: 201 Created
 * {
 *   "message": "User created successfully"
 * }
 *
 * // Response (Error)
 * Status: 500 Internal Server Error
 * {
 *   "error": "Internal server error"
 * }
 */
router.post('/', (req, res) => {
  // Extract user data from the request body
  const { firstname, lastname, phone, username, email, password } = req.body;

  // Hash the password with the predefined salt
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

// Export the router to be used in other parts of the application
module.exports = router;
