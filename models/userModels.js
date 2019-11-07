const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findByEmail,
  add,
  findByRole,
  updateUser,
  deleteUser,
};

function find() {
  return db("users as u")
    .join("roles as r", "r.id", "u.roleId")
    .select(
      "u.id as userId",
      "u.firstName",
      "u.lastName",
      "u.email",
      "u.password",
      "r.name as role"
    );
}

function updateUser(changes, email) {
  return db("users")
    .where({ "email": email })
    .update(changes)
    .then(() => findByEmail(email));
}

function deleteUser(id) {
  return db("users")
    .where({ "id": id })
    .del();
}

function findByEmail(email) {
  return db("users as u")
    .where({ "u.email": email })
    .first()
    .join("roles as r", "r.id", "u.roleId")
    .select(
      "u.id",
      "u.firstName",
      "u.lastName",
      "u.email",
      "u.password",
      "r.name as role",
      'r.id as roleId'
    );

}

async function add(values) {
  const [newUser] = await db("users")
    .insert(values)
    .returning("*");
  
  const [role] = await db('roles')
    .where({id: values.roleId})
    .select(
      "name as role",
    );

  return {...newUser, ...role};
}

function findByRole(role) {
  return db("roles as r")
    .where({ 'r.name': role })
    .join("users as u", "r.id", "u.roleId")
    .select(
      "u.id as userId",
      "u.firstName",
      "u.lastName",
      "u.email",
      "r.name as role"
    )
}
