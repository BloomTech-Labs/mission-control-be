
exports.up = function(knex) {
  return knex.schema
    .createTable('admin', user => {
        user.string('id').unique().notNullable().primary();
        user.string('username').unique().notNullable();
        user.string('email').unique().notNullable();
        user.string('password').unique().notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('admin');
};
