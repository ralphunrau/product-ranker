/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // delete existing entries
  return knex('users').del()
    .then(() => {
      // insert new seeds
      return knex('users').insert([
        {id: 1, username: 'Jamesbly', email: 'jbly@email.com', password: 'jikulon'},
        {id: 2, username: 'SammyHammy', email: 'spark@email.com', password: 'secret'},
        {id: 3, username: 'Tomtheriddler', email: 'tom@email.com', password: 'easy'}
      ]);
    });
};
