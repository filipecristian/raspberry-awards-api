const express = require('express');
const loadCSV = require('../loadCSV');
const producersFormatter = require('../producersFormatter');
const router = express.Router();

// Aqui vamos montar a lógica depois
router.get('/intervals', (req, res) => {
  loadCSV.getProducersWithMultipleWins()
    .then(
      (producers) => {
        const result = producersFormatter.organizeProducers(producers);
        res.json(result);
    });
});

module.exports = router;
