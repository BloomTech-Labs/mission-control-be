const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  const password = bcrypt.hashSync("password", 8);

  return knex("users").insert([
    {
      id: "1",
      firstName: "Bernie",
      lastName: "Derfee",
      email: "user1@gmail.com",
      password: password,
      roleId: "03"
    },
    {
      id: "2",
      firstName: "Edd",
      lastName: "Burke",
      email: "user2@gmail.com",
      password: password,
      roleId: "02"
    },
    {
      id: "3",
      firstName: "Brandon",
      lastName: "Desselle",
      email: "user3@gmail.com",
      password: password,
      roleId: "01"
    }
  ]);
};
