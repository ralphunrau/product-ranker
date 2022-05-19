const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');

const { getUserByEmail, registerUser } = require('../db/db');


router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  getUserByEmail(email)
    .then(user => {
      if(bcrypt.compareSync(password, user.password)) {
        req.session.user = user.username;
        res.send({username: user.username, email: email});
        return;
      }
      res.sendStatus(403);
    })
    .catch(error => console.error(error));
});

router.post('/register', (req, res) => {
  const email = req.body.email;
  const username = req.body.username;

  getUserByEmail(email)
    .then((user) => {
      if(user) {
        res.sendStatus(403);
        return;
      };

      const newUser = {
        email: email,
        username: username,
        password: bcrypt.hashSync(req.body.password, 10)
      }

      registerUser(newUser)
        .then(() => res.send({username: username, email: email}))
        .catch(error => console.error(error));
    });
});

router.post('/logout', (req, res) => {
  req.session = null;
  res.send({});
})

module.exports = router;