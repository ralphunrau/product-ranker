const express = require('express');
const router = express.Router();
const db = require ('../db/knexfile');

router.get('/', (req, res) => {
  console.log(res);
  console.log('asdfasdfasdf');
});


module.exports = router;