const db = require('../data/dbConfig.js')

module.exports = {
    find,
    findByUsername
}

function find(){
    return db('admin')
}

function findByUsername(username){
     return db('admin')
    .where({username: username})
    .first();
}