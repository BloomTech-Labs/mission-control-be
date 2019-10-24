exports.up = function(knex) {
  return knex.schema
    .createTable("roles", role => {
      role
        .string("id")
        .unique()
        .notNullable()
        .primary();
      role
        .string("name")
        .unique()
        .notNullable();
    })
    .createTable("users", user => {
      user
        .string("id")
        .unique()
        .notNullable()
        .primary();
      user.string("firstName").notNullable();
      user.string("lastName").notNullable();
      user
        .string("email")
        .unique()
        .notNullable();
      user.string("password").notNullable();
    })
    .createTable("users-roles", tbl => {
      tbl
        .string("user_id")
        .unique()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .string("role_id")
        .defaultTo("01")
        .references("id")
        .inTable("roles")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("users-roles")
    .dropTableIfExists("users")
    .dropTableIfExists("roles");
};
