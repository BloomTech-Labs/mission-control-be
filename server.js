const express = require('express')
const helmet = require('helmet');
const cors = require('cors');

const server = express();


//? Routes - 
const adminRoutes = require('./routes/admins')

server.use(express.json());
server.use(helmet());
server.use(cors())

server.use('/admins', adminRoutes)

server.get('/', (req, res) => {
    res.status(200).json({message: "hello"})
})

server.use('/docs', express.static('./docs'));

module.exports = server
