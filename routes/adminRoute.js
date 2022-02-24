const express = require('express')
const adminRouter = express.Router();
const UserController = require('../controllers/UserController')
const GameController = require('../controllers/GameController')



module.exports = adminRouter