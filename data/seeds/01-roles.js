exports.seed = function(knex) {
  return knex("roles").insert([
    {
      id: "01",
      name: "student"
    },
    {
      id: "02",
      name: "manager"
    },
    {
      id: "03",
      name: "admin"
    }
  ]);
};
