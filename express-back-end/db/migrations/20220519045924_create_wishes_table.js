
exports.up = function(knex) {
  return knex.schema
    .createTable('wishes', (table) => {
      table.increments('id').primary();
      table.string('product_id').references('id').inTable('products').onDelete('cascade').notNullable();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade').notNullable();
      table.integer('position')

      table.timestamps(true, true, true);
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('wishes');
};
