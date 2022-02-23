const { User, Game, UserGame, UserDetail } = require('../models')
const { Op } = require('sequelize')

class GameController{
  static getGames(req, res) {
    let { search } = req.query;
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
      res.send(games)
      // res.render('shop', { games })
    })
    .catch(err => {
      res.send(err)
    })
  }
  static getGameDetail(req, res) {
    const { GameId } = req.params;
    const UserId = req.session && req.session.role === 'client' ? req.session.UserId : null;
    // const UserId = 2
    let options = {}
    if(UserId){
      options.include = {
        model: UserGame,
        where: {
          [Op.and]: [{
            UserId
          },
          {
            GameId
          }]
        }
      }
    }

    UserGame.findByPk(GameId)
      .then(game => {
        res.send(game)
      })
      .catch(err => {
        res.send(err)
      })
  }
  static getGameDelete(req, res) {
  }

}

module.exports = GameController