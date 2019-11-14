const bcrypt = require('bcryptjs')

const password = bcrypt.hashSync('password', 14)

let seeds 

if(process.env.DB_ENV === 'development' || process.env.DB_ENV === 'development'){
  seeds = [
    {
      id: "ac3dc091-8d13-46c5-b589-4a9f2e217f63",
      firstName: "Bernie",
      lastName: "Durfee",
      email: 'user1@gmail.com',
      password: password,
      roleId: '03'
    },
    {
      id: "ac3dc091-8d13-46c5-b589-4a9f2e217f64",
      firstName: "Adam",
      lastName: "McKenney",
      email: 'user2@gmail.com',
      password: password,
      roleId: '02'
    },
    {
      id: "ky3dc091-8d13-46c5-b589-4a9f2e217f64",
      firstName: "Armando",
      lastName: "Roman",
      email: 'user3@gmail.com',
      password: password,
      roleId: '01'
    },
  ]
}else if (process.env.DB_ENV === 'production'){
  seeds = [{
    id: "ac3dc091-8d13-46c5-b589-4a9f2e217f63",
    firstName: "Bernie",
    lastName: "Durfee",
    email: 'bernie@berniedurfee.com',
    password: password,
    roleId: '03'
  }]
}

exports.seed = function(knex) {
    return knex("users").insert(seeds);
  };