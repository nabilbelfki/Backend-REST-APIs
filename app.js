const express = require('express');
const cors = require('cors');
const LoginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const skillsRouter = require('./routes/skills');
const surgeriesRouter = require('./routes/surgeries');
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/// Logging middleware
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);
  next();
});

// Routes
app.use('/api/login', LoginRouter);
app.use('/api/users', usersRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/surgeries', surgeriesRouter);
app.use('/api/classes', classesRouter);
app.use('/api/classexercises', classexercisesRouter);
app.use('/api/exercises', exercisesRouter);
app.use('/api/instructors', instructorsRouter);
app.use('/api/members', membersRouter);
app.use('/api/memberships', membershipsRouter);
app.use('/api/payroll', payrollRouter);
app.use('/api/registration', registrationRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/schedule', scheduleRouter);


const port = 14291;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
