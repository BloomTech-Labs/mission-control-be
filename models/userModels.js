const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findByEmail,
  add,
  findByRole,
  updateUser,
  deleteUser
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
  return db("users as u")
    .where({ "u.email": email })
    .update(changes);
}

/* function update(email, data){
  return db('users')
  .where({email: email})
  .update(data)
  .then(([id]) => {
    return db('users')
    .where({id: id})
    .first()
  })
  .catch( err => err)
} */

function deleteUser(email) {
  return db("users as u")
    .where({ "u.email": email })
    .del();
}

async function findByEmail(email) {
  let [results] = await db("users as u")
    .where({ "u.email": email })
    .join("roles as r", "r.id", "u.roleId")
    .select(
      "u.id",
      "u.firstName",
      "u.lastName",
      "u.email",
      "u.password",
      "r.name as role"
    );
  return results;
}

async function add(values) {
  const [newUser] = await db("users")
    .insert(values)
    .returning("*");

  return newUser;
}

async function findByRole(role) {
  return db("users as u")
    .join("roles as r", "r.id", "u.roleId")
    .select(
      "u.id as userId",
      "u.firstName",
      "u.lastName",
      "u.email",
      "r.name as role"
    )
    .where({ role: role });
}
