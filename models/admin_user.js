const db = require('../data/dbConfig.js')

module.exports = {
    find,
    findByUsername,
    findByEmail
}

function find(){
    return db('admin')
}

async function findByUsername(username){

     let [results] = await db('admin as a')

    .where({'a.username': username})
    .join('role as r', 'r.id', 'a.role_id')
    .select('a.id as user_id','a.password', 'a.username', 'a.email', 'r.name as role')

    return results
}

async function findByEmail(email){

    let [results] = await db('admin as a')

   .where({'a.email': email})
   .join('role as r', 'r.id', 'a.role_id')
   .select('a.id as user_id', 'a.password', 'a.username', 'a.email', 'r.name as role')

   return results
}