exports.up = function (knex) {
  return knex.schema
    .createTable("role", role => {
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
    .createTable("admin", user => {
      user
        .string("id")
        .unique()
        .notNullable()
        .primary();
      user
        .string("first_name")
        .notNullable();
      user
        .string("last_name")
        .notNullable();
      user
        .string("email")
        .unique()
        .notNullable();
      user.string("password").notNullable();
      user
        .string("role_id")
        .notNullable()
        .references("id")
        .inTable("role")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("admin").dropTableIfExists("role");
};