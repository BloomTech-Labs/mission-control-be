const express = require('express')
const helmet = require('helmet');
const cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const server = express();


//? Routes - 
const adminRoutes = require('./routes/admins')
const adminAuth = require('./auth/adminAuth')

app.set('views', path.join(__dirname, 'views'));
server.use(express.json());
server.use(helmet());
server.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

server.use('/api/admins', adminRoutes)
server.use('/api/auth', adminAuth)


server.get('/', (req, res) => {
    res.status(200).json({message: "hello"})
})

server.use('/docs', express.static('./docs'));

module.exports = server
