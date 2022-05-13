const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', (req, res) => {
  console.log(res);
  console.log('asdfasdfasdf');
});


module.exports = router;