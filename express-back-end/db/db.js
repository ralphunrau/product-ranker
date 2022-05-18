const knex = require('./knex');

const getUserByEmail = (emailinput) => {
  return knex('users')
    .where({ email: emailinput })
    .then((res) => res[0])
    .catch(e => console.log(e.message));
};

const registerUser = (user) => {
  const newUser = {
    email: user.email,
    username: user.username,
    password: user.password
  }
  return knex('users')
    .insert({...newUser})
    .then(() => newUser)
    .catch(e => console.log(e.message));
}

module.exports = {
  getUserByEmail,
  registerUser
}