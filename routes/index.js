const express = require('express')
const router = express.Router();
const UserController = require('../controllers/UserController')
const GameController = require('../controllers/GameController')

router.get('/', UserController.getHome)