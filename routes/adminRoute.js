const express = require('express')
const adminRouter = express.Router();
const UserController = require('../controllers/UserController')
const GameController = require('../controllers/GameController')

adminRouter.get('/admins/shop', GameController.getGames)
adminRouter.get('/admins/shop/add', GameController.getAddGame)
adminRouter.post('/admins/shop/add', GameController.postAddGame)
adminRouter.get('/admins/shop/:GamesId', GameController.getGameDetail)
adminRouter.get('/admins/shop/:GamesId/delete', GameController.getDeleteGame)
adminRouter.get('/admins/shop/:GamesId/edit', GameController.getEditGame)
adminRouter.post('/admins/shop/:GamesId/edit', GameController.postEditGame)

module.exports = adminRouter