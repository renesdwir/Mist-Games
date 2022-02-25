'use strict';
const {
  Model
} = require('sequelize');
const accounting = require('accounting-js')
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static formatSize(num) {
      num = num / 1000
      return accounting.toFixed(num, 2) + 'GB'
    }

    get formatRupiah() {
      return (this.price).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
      });
    }
    static associate(models) {
      // define association here
      Game.belongsToMany(models.User, {
        through: models.UserGame,
        foreignKey: "GameId"
      });
    }
  }
  Game.init({
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg:"Please fill game name"
        },
        notEmpty:{
          msg:"Please fill  game name"
        }
      }
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric:{
          msg: "Please fill game price with number"
        },
        notNull:{
          msg:"Please fill game size"
        },
        notEmpty:{
          msg:"Please fill game size"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric:{
          msg: "Please fill game price with number"
        },
        notNull:{
          msg:"Please fill game price"
        },
        notEmpty:{
          msg:"Please fill game price"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull:{
          msg:"Please fill description"
        },
        notEmpty:{
          msg:"Please fill description"
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          msg:"Please fill image with URL"
        },
        notNull:{
          msg:"Please fill image"
        },
        notEmpty:{
          msg:"Please fill image"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};