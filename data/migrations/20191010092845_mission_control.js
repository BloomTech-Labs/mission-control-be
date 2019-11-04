exports.up = function(knex) {
    return (
      knex.schema
        /* The Roles Table stores our 3 roles that will be associated with users */
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
        /* The Users Table stores our users with all relevant user data */
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
            .inTable("roles")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        })
    );
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users").dropTableIfExists("roles");
  };