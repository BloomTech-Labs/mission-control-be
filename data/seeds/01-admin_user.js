exports.seed = function(knex) {
  return knex("admin").insert([
    {
      id: "abc123",
      username: "user1",
      email: "user1@gmail.com",
      password: "password"
    }
  ]);
};
