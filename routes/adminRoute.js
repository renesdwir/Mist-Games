const express = require('express')
const adminRouter = express.Router();
const UserController = require('../controllers/UserController')
const GameController = require('../controllers/GameController')

adminRouter.get('/shop', GameController.getGames)
adminRouter.get('/shop/add', GameController.getAddGame)
adminRouter.post('/shop/add', GameController.postAddGame)
adminRouter.get('/shop/:GamesId', GameController.getGameDetail)
adminRouter.get('/shop/:GamesId/delete', GameController.getDeleteGame)
adminRouter.get('/shop/:GamesId/edit', GameController.getEditGame)
adminRouter.post('/shop/:GamesId/edit', GameController.postEditGame)

module.exports = adminRouter