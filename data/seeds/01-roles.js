exports.seed = function(knex) {
  return knex("roles").insert([
    {
      id: "01",
      name: "student",
      permissons: []
    },
    {
      id: "02",
      name: "manager",
      permissons: []
    },
    {
      id: "03",
      name: "admin",
      permissons: []
    }
  ]);
};
