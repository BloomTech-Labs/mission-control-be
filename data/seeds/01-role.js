exports.seed = function(knex) {
  
  return knex("role").insert([
    {
      id: "123abc",
      name: "master"
    }
  ]);

};