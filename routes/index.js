const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const GameController = require('../controllers/GameController')
const adminRouter = require('./adminRoute');
const clientRouter = require('./clientRoute');
const { isAdmin, isClient, isLoggedIn, clientsLoggedIn } = require('../middleware/session');


router.get('/', UserController.getHome);
router.get('/login', clientsLoggedIn, UserController.getLogin);
router.post('/login',UserController.postLogin);
router.get('/register', clientsLoggedIn, UserController.getRegister);
router.get('/shop', GameController.getGames)
router.get('/shop/:GameId', GameController.getGameDetail)

router.use(isLoggedIn)

router.use('/clients', isClient, clientRouter)
router.use('/admins', isAdmin, adminRouter)
router.use('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.send(err)
      return
    }
      res.redirect('/');
    })
    
})

module.exports = router