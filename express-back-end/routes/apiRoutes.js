const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/data', (req, res) => {
  res.json({message: "Seems to work!"});
});

module.exports = router;