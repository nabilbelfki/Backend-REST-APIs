const express = require('express');
const cors = require('cors');
const classesRouter = require('./routes/classes');
const classexercisesRouter = require('./routes/classexercises');
const exercisesRouter = require('./routes/exercises');
const instructorsRouter = require('./routes/instructors');
const membersRouter = require('./routes/members');
const membershipsRouter = require('./routes/memberships');
const payrollRouter = require('./routes/payroll');
const registrationRouter = require('./routes/registration');
const roomsRouter = require('./routes/rooms');
const scheduleRouter = require('./routes/schedule');

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: true })); // Parse incoming URL-encoded data
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

/// Logging middleware
app.use((req, res, next) => {
  // Log details of incoming requests
  console.log(`Received ${req.method} request for ${req.url}`);
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);
  next();
});

// Routes
app.use('/api/classes', classesRouter); // Classes management routes
app.use('/api/classexercises', classexercisesRouter); // Class exercises routes
app.use('/api/exercises', exercisesRouter); // Exercises management routes
app.use('/api/instructors', instructorsRouter); // Instructors management routes
app.use('/api/members', membersRouter); // Members management routes
app.use('/api/memberships', membershipsRouter); // Memberships management routes
app.use('/api/payroll', payrollRouter); // Payroll management routes
app.use('/api/registration', registrationRouter); // Registration routes
app.use('/api/rooms', roomsRouter); // Rooms and facilities management routes
app.use('/api/schedule', scheduleRouter); // Schedule management routes

const port = 14291;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
