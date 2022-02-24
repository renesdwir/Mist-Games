const express = require('express')
const router = express.Router();
const { GameController, UserController } = require('../controllers')

router.get('/', UserController.getHome)