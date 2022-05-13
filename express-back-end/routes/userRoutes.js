const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('', (req, res) => {
  knex('users')
    .select({
      id: 'id',
      username: 'username',
      email: 'email'
    })
    .then((users) => res.send(users))
    .catch((error) => console.error(error));
});

module.exports = router;