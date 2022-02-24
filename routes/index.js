const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const GameController = require('../controllers/GameController')
const adminRouter = require('./adminRoute');
const clientRouter = require('./clientRoute');
const { isAdmin, isClient, isLoggedIn } = require('../middleware/session');


router.get('/', UserController.getHome);
router.get('/login', UserController.getLogin);
router.post('/login', UserController.postLogin);
router.get('/register', UserController.getRegister);
router.get('/shop', GameController.getGames)
clientRouter.get('/shop/:GameId', GameController.getGameDetail)

router.use(isLoggedIn)

router.use('/clients', isClient, clientRouter)
router.use('/admins', isAdmin, adminRouter)

module.exports = router