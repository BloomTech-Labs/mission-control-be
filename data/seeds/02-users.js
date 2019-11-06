const bcrypt = require('bcryptjs')

const password = bcrypt.hashSync('password', 14)

exports.seed = function(knex) {
    return knex("users").insert([
      {
        id: "100",
        firstName: "Armando",
        lastName: "Roman",
        email: "user1@gmail.com",
        password: password,
        roleId: '01'
      },
      {
        id: "200",
        firstName: "Adam",
        lastName: "McKenney",
        email: "user2@gmail.com",
        password: password,
        roleId: '02'
      },
      {
        id: "300",
        firstName: "Bernie",
        lastName: "Durfee",
        email: "user3@gmail.com",
        password: password,
        roleId: '03'
      }
    ]);
  };