const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findByEmail,
  add,
  findByRole,
  updateUser
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

async function updateUser(user) {
  await findByEmail(user.email).then();
}

async function findByEmail(email) {
  let [results] = await db("users as u")
    .where({ "u.email": email })
    .join("roles as r", "r.id", "u.roleId")
    .select(
      "u.id as userId",
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
