const express = require('express')
const clientRouter = express.Router();
const UserController = require('../controllers/UserController')
const GameController = require('../controllers/GameController')

clientRouter.get('/', UserController.getClient)
clientRouter.get('/shop', GameController.getGames)
clientRouter.get('/shop/:GameId', GameController.getGameDetail)
clientRouter.get('/shop/:GameId/buy', GameController.getBuyGame)
clientRouter.get('/myGames', UserController.getMyGames)
clientRouter.get('/myGames/:GameId', GameController.getGameDetail)
clientRouter.get('/myGames/:GameId/checkout', UserController.getCheckoutGame)
clientRouter.get('/myGames/:GameId/delete', UserController.getCheckoutGame)

module.exports = clientRouter