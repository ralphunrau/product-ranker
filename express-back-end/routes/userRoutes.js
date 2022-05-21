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
        req.session.user = user.id;
        res.send({id: user.id, username: user.username, email: email});
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
        .then(() => {
          getUserByEmail(email)
          .then((user) => {
            res.send({id: user.id, username: user.username, email: email});
            req.session.user = user.id;
            return;
          });
        })
        .catch(error => console.error(error));
  });
});

router.post('/logout', (req, res) => {
  req.session = null;
  res.send({});
})

router.get('/:id', (req, res) => {
  const templateVars = {
    name: 'USER'
  }
  res.render()
})

module.exports = router;