const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', (req, res) => {
  const pID = req.query.id || '';

  // Execute the stored procedure query
  pool.query('CALL GetSurgeries(?)', [pID], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Process the query results
    const surgeries = results[0];
    res.json(surgeries);
  });
});

module.exports = router;
