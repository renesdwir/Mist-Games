'use strict';
const {
  Model
} = require('sequelize');

const { encrypt } = require('../helper/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserDetail, { foreignKey: 'UserId' })
      User.belongsToMany(models.Game, {
        through: models.UserGame,
        foreignKey: "UserId"
      });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg:"Please fill username"
        },
        notEmpty:{
          msg:"Please fill username"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg:"Please fill pasword"
        },
        notEmpty:{
          msg:"Please fill username"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg:"Please fill role"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user, opt){
        user.password = encrypt(user.password)
        if(user.role === null){
          user.role = 'client'
        }
      }
    }
  });
  return User;
};