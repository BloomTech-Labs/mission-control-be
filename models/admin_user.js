const db = require('../data/dbConfig.js')

module.exports = {
    find,
    findByEmail,
    add
}

function find(){
    return db('admin')
}

async function findByEmail(email){

    let [results] = await db('admin as a')

   .where({'a.email': email})
   .join('role as r', 'r.id', 'a.roleId')
   .select('a.id as userId', 'a.password', 'a.firstName', 'a.lastName', 'a.email', 'r.name as role')

   return results
}

async function add(values){

    const [newUser] = await db('admin')
    .insert(values)
    .returning('*')

    return newUser
}