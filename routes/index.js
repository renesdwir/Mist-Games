const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const adminRouter = require('./adminRoute');
const clientRouter = require('./clientRoute');
const { isAdmin, isClient, isLoggedIn } = require('../middleware/session');


router.get('/', UserController.getHome)
router.get('/login', UserController.getLogin)
router.get('/register', UserController.getRegister)

router.use(isLoggedIn)

router.use('/clients', isClient, clientRouter)
router.use('/admins', isAdmin, adminRouter)

module.exports = router