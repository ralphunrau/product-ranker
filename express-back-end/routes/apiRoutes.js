const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/data', (req, res) => {
  res.json({message: "Seems to work!"});
});

router.get('/user', (req, res) => {
  knex('users')
    .select({
      id: 'id',
      username: 'username',
      email: 'email'
    })
    .then((users) => res.json(users))
    .catch((error) => console.error(error));
})

module.exports = router;