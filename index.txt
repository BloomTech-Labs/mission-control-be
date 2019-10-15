require('dotenv').config()

const server = require('./server.js');

const defaults = require('./config/defaults');

server.listen( defaults.port , () => console.log(`*** Server is listening on port ${defaults.port} ***`))