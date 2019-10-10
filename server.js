const express = require('express')
const helmet = require('helmet');
const cors = require('cors');

const server = express();


//? Routes - 
const adminRoutes = require('./routes/admins')
const adminAuth = require('./auth/adminAuth')

server.use(express.json());
server.use(helmet());
server.use(cors())

server.use('/api/admins', adminRoutes)
server.use('/api/auth', adminAuth)


server.get('/', (req, res) => {
    res.status(200).json({message: "hello"})
})

server.use('/docs', express.static('./docs'));

module.exports = server
