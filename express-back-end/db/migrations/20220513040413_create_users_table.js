/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  // create new table with following columns
    .createTable('users', (table) => {
      table.increments('id');
      table.string('username', 255).notNullable();
      table.string('email', 255).notNullable();
      table.string('password', 255).notNullable();
      
      // default to created_at and updated_at
      table.timestamps();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  // roll-back migration to drop table
  return knex.schema
    .dropTable('users');
};
