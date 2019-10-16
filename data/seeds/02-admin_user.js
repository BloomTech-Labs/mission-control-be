const bcrypt = require('bcryptjs')

exports.seed = function(knex) {

  const password = bcrypt.hashSync('password', 8)
  
  return knex("admin").insert([
    {
      id: "abc123",
      first_name: 'John',
      last_name: 'Doe',
      email: "user1@gmail.com",
      password: password,
      role_id: "123abc"
    }
  ]);
};
