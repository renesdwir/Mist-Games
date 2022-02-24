const { User, Game, UserGame, UserDetail } = require('../models')
const { compare } = require('../helper/bcrypt');
const { Op } = require('sequelize')

class UserController{
  static getHome(req, res) {
    const login = req.session.UserId ? 'true' : 'false';
    if(login === 'true'){
      const options = {
        include: {
          model: UserDetail
        }
      }
      User.findByPk(req.session.UserId, options)
        .then(user => {
          res.render('home', { page: "home", login, user })
        })
        .catch(err => {
          console.log(err)
          res.send(err)
        })
    } else {
      res.render('home', { page: "home", login })
    }
  }
  static getClient(req, res) {
    res.redirect('/clients/shop')
  }
  static getRegister(req, res) {
    const { err } = req.query
    const arrErr = err.split(';')
    res.render('register', { arrErr })
  }
  static postRegister(req, res) {
    const { username, password, firstName, lastName, email, country } = req.body
    User.count({ where: {
      username
    }})
    .then(num => {
      if(num > 0) {
        res.redirect('/register?err=Username%already%exists')
        return
      }
      const role = req.session ? 'admin' : null;
      return User.create({ username, password, role }, { returning: true })
    })
    .then(user => {
      return UserDetail.create({ firstName, lastName, email, country, UserId: user.id })
    })
    .then(()=>{
      res.redirect('/login')
    })
    .catch(err => res.send(err))
  }
  static getLogin(req, res){
    const { err } = req.query
    const arrErr = err && err.split(';')
    res.render('signin', { arrErr })
  }
  static postLogin(req, res){
    const { username, password } = req.body;
    User.findOne({ where: { username } })
      .then(user => {
        if(!user){
          res.redirect('/login?err=Username+is+not+found')
          return
        }
        if(compare(password, user.password)){
          req.session.UserId = user.id
          req.session.role = user.role
          console.log(req.session)
          res.redirect('/')
          return
        }
        res.redirect('/login?err=Wrong%Password')
      })
      .catch(err => {
        if(err.name === 'SequelizeValidationError'){
          err = err.errors && err.errors.map(el => el.message).join(';')
          res.redirect(`/login?err=${err}`)
          return
        }
        res.send(err)
      })
  }
  static getUserDetail(req, res) {
    const { UserId } = req.session;
    const include = {
      model: User,
      where: {
        id: UserId
      }
    }
    UserDetail.findOne({ include })
      .then(userDetail => {
        res.render('userdetail', { userDetail })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static getMyGames(req, res){
    const { UserId } = req.session;
    const page = 'mygames'
    const login = 'true'
    User.findByPk(UserId, {
      include: {
        model: Game
      }
    })
    .then(user => {
      const games = user.Games
      res.render('mygames', { user, page, games, login })
    })
    .catch(err => {
      res.send(err)
    })
  }
  static getCheckoutGame(req, res){
    const { UserId } = req.session;
    const { GameId } = req.params;
    const where = {
      [Op.and]: [{UserId}, {GameId}]
    }
    UserGame.update({purchased: true},{ where } )
      .then(() => {
        res.redirect('/clients/myGames')
      })
      .catch(err => {
        res.send(err)
      })
  }
  static getDeleteCheckoutGame(req, res){
    const { UserId } = req.session;
    const { GameId } = req.params;
    const where = {
      [Op.and]: [{UserId}, {GameId}]
    }
    UserGame.destroy({ where })
      .then(() => {
        res.redirect('/clients/myGames')
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = UserController