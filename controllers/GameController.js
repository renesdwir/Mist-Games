const { User, Game, UserGame, UserDetail } = require('../models')
const { Op } = require('sequelize')

class GameController{
  static getGames(req, res) {
    let { search } = req.query;
    const page = 'shop'
    search = search || ''
    const options = {
      where: {
        name:{
          [Op.iLike]: `%${search}%`
        }
      }
    }
  Game.findAll(options)
    .then(games => {
      res.render('shop', { games, page })
    })
    .catch(err => {
      res.send(err)
    })
  }
  static getGameDetail(req, res) {
    const { GameId } = req.params;
    const page = 'shop'
    const role = req.session && req.session.role
    const UserId = req.session && role === 'client' ? req.session.UserId : null;
    let options = {}
    if(UserId){
      options.include = {
        model: User,
        where: {
          id: UserId
        }
      }
    };

    Game.findByPk(GameId, options)
      .then(game => {
        res.render('gameDetail', { game })
      })
      .catch(err => {
        res.send(err)
      })
  }
  static getBuyGame(req, res) {
    const { GameId } = req.params;
    const UserId = req.session.UserId;
    UserGame.create({ GameId, UserId })
      .then(() => {
        res.redirect(`/clients/shop/${GameId}`)
      })
      .catch(err => {
        res.send(err)
      })
  }
  static getDeleteGame(req, res) {
    const { GameId } = req.params;
    Game.destroy({ where: { GameId } })
      .then(() => {
        res.redirect('/admins/shop')
      })
      .catch(err => {
        res.send(err)
      })
  }
  static getAddGame(req, res){
    const { err } = req.query
    const inputErr = err.split(';')
    res.send('formAdd', { inputErr })
  }
  static postAddGame(req, res){
    const { name, size, price, description, image } = req.body;
    Game.create({ name, size, price, description, image })
      .then(() => {
        res.redirect('/admins/shop')
      })
      .catch(err => {
        if(err.name = 'SequelizeValidationError'){
          err = err.errors.map(el => el.message).join(';')
          res.redirect(`/admins/shop/add?err=${err}`)
          return
        }
        res.send(err)
      })
  }
  static getEditGame(req, res){
    const { err } = req.query
    const inputErr = err.split(';')
    const { GameId } = req.params

    Game.findByPk(GameId)
      .then(game => {
        res.render('editGame', { game, inputErr })
      })
      .catch(err => {
        res.send(err)
      })
  }
  static postAddGame(req, res){
    const { name, size, price, description, image } = req.body;
    const { GameId } = req.params;
    Game.update({ name, size, price, description, image }, { where: { GameId } })
      .then(() => {
        res.redirect('/admins/shop')
      })
      .catch(err => {
        if(err.name = 'SequelizeValidationError'){
          err = err.errors.map(el => el.message).join(';')
          res.redirect(`/admins/shop/add?err=${err}`)
          return
        }
        res.send(err)
      })
  }

}

module.exports = GameController