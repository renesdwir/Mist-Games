const express = require('express')
const adminRouter = express.Router();
const ClientController = require('../controllers/ClientController')
const GameController = require('../controllers/GameController')


module.exports = adminRouter