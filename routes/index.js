const express = require('express')
const router = express.Router();
const ClientController = require('../controllers/ClientController')
const adminRouter = require('./adminRoute')
const clientRouter = require('./clientRoute')

router.get('/', ClientController.getHome)
router.get('/login', ClientController.getLogin)
router.get('/register', ClientController.getRegister)

router.use('/clients', clientRouter)
router.use('/admins', adminRouter)

module.exports = router