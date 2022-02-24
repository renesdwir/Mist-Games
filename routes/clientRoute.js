const express = require('express')
const clientRouter = express.Router();
const ClientController = require('../controllers/ClientController')
const GameController = require('../controllers/GameController')

clientRouter.get('/', ClientController.getClient)
clientRouter.get('/shop', GameController.getGames)
clientRouter.get('/shop/:GameId', GameController.getGameDetail)

module.exports = clientRouter