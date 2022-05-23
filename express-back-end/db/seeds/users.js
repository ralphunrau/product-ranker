require('dotenv').config({ path: '../../.env' });

const bcrypt = require('bcrypt');

const firstHashPass = bcrypt.hashSync(process.env.FIRST_USER_PASS, 10);
const secondHashPass = bcrypt.hashSync(process.env.SECOND_USER_PASS, 10);
const thidHashPass = bcrypt.hashSync(process.env.THIRD_USER_PASS, 10);

exports.seed = async function(knex) {
  // delete existing entries
  return knex('users').del()
    .then(() => {
      // insert new seeds
      return knex('users').insert([
        {username: 'Jamesbly', email: 'jbly@email.com', password: firstHashPass},
        {username: 'SammyHammy', email: 'sam@email.com', password: secondHashPass},
        {username: 'Tomtheriddler', email: 'tom@dom.com', password: thidHashPass}
      ]);
    });
};
