const bcrypt = require('bcryptjs')

exports.seed = function(knex) {

  const password = bcrypt.hashSync('password', 8)
  
  return knex("admin").insert([
    {
      id: "abc123",
      firstName: 'John',
      lastName: 'Doe',
      email: "user1@gmail.com",
      password: password,
      roleId: "123abc"
    }
  ]);
};
