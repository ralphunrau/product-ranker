/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('products', (table) => {
      table.string('id', 255).notNullable().primary();
      table.string('image', 255).notNullable();
      table.string('link', 255).notNullable();
      table.string('title', 255).notNullable();
      table.string('price', 255).notNullable().defaultTo('Not Available');
      table.decimal('rating').notNullable().defaultTo(0);
      table.integer('ratings_total').notNullable().defaultTo(0);

      table.timestamps(true, true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
  return knex.schema
    .dropTable('products')
};
