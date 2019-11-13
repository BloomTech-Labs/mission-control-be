const bcrypt = require('bcryptjs')

const password = bcrypt.hashSync('password', 14)

exports.seed = function(knex) {
    return knex("users").insert([
      {
        id: "ac3dc091-8d13-46c5-b589-4a9f2e217f63",
        firstName: "Bernie",
        lastName: "Durfee",
        email: 'bernie@berniedurfee.com',
        password: password,
        roleId: '03'
      },
    ]);
  };