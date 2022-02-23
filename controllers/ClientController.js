const { User, Game, UserGame, UserDetail } = require('../models')

class ClientController{
  static getHome(req, res) {
    res.send('hello')
  }
  static getClient(req, res) {
    res.redirect('/clients/shop')
  }
  static getRegister(req, res) {
    // res.render('register')
  }
  static postRegister(req, res) {
    const { username, password } = req.body
    User.count({ where: {
      username
    }})
    .then(num => {
      if(num > 0){
        res.redirect('/register?err=Username%already%exists')
        return
      }
      const role = req.session ? 'admin' : 'client'
      return User.create({ username, password })
    })
    .then(() => {
      res.redirect('/login')
    })
    .catch(err => res.send(err))
  }
  static getLogin(req, res){
    const { err } = req.query;
    res.render('login', { err })
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
          req.session = {
            ...req.session,
            UserId: user.id,
            role: user.role
          }
          res.send(req.session)
          return
        }
        res.redirect('/login?err=Wrong%Password')
      })
  }
}

module.exports = ClientController