const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/:Wages?', (req, res) => {
  const IDs = req.params.Wages || '';

  // Execute the stored procedure query
  pool.query('CALL GetWages(?)', [IDs], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Process the query results
    const wages = results[0];
    res.json(wages);
  });
});

module.exports = router;