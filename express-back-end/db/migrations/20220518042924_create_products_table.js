
exports.up = function(knex) {
  return knex.schema
    .createTable('products', (table) => {
      table.string('id', 255).notNullable().primary();
      table.string('image', 1000).notNullable();
      table.string('link', 1000).notNullable();
      table.string('title', 1000).notNullable();
      table.string('price', 1000).notNullable().defaultTo('Not Available');
      table.decimal('rating').notNullable().defaultTo(0);
      table.integer('ratings_total').notNullable().defaultTo(0);

      table.timestamps(true, true, true);
    })
};

exports.down = function(knex) {
  
  return knex.schema
    .dropTable('products')
};
