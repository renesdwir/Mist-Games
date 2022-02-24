const express = require('express')
const adminRouter = express.Router();
const UserController = require('../controllers/ClientController')
const GameController = require('../controllers/GameController')


module.exports = adminRouter