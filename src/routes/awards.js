const express = require('express');
const winnersSearchService = require('../services/winners-search-service');
const router = express.Router();

router.get('/intervals', (req, res) => {
  winnersSearchService.findMaxAndMinWinners()
    .then((data) => res.json(data));
});

module.exports = router;
