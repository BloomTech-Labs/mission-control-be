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
      user
        .string("roleId")
        .notNullable()
        .references("id")
        .inTable("role")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users").dropTableIfExists("roles");
};
