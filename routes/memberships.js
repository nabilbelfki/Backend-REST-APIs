const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/:Memberships?', (req, res) => {
  const IDs = req.params.Memberships || '';

  // Execute the stored procedure query
  pool.query('CALL GetMemberships(?)', [IDs], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Process the query results
    const memberships = results[0];
    res.json(memberships);
  });
});

module.exports = router;