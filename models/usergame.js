'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserGame.belongsTo(models.User, { 
        foreignKey: "UserId",
        targetKey: "id"
      });
      
      UserGame.belongsTo(models.Game, { 
        foreignKey: "GameId",
        targetKey: "id"
      });
    }
  }
  UserGame.init({
    purchased: DataTypes.BOOLEAN,
    UserId: {
      type: DataTypes.INTEGER,
    },
    GameId: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'UserGame',
    hooks: {
      beforeCreate(userGame){
        userGame.purchased = false
      }
    }
  });
  return UserGame;
};