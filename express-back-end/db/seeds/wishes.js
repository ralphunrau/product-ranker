exports.seed = async function(knex) {
  // delete existing entries
  return knex('wishes').del()
    .then(() => {
      // insert new seeds
      return knex('wishes').insert([
        {user_id: 1, product_id: 'B00199F2WW'},
        {user_id: 1, product_id: 'B000C8ZB18'},
        {user_id: 1, product_id: 'B00029KC2K'}
      ]);
    });
};
