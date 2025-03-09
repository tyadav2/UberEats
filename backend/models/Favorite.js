'use strict';
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Restaurant = require("./Restaurant");
const User = require("./User");


module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Restaurants',
        key: 'id',
      },
      onDelete: 'CASCADE',
    }
  }, {
    timestamps: true
  });
  
  // Define associations
  Favorite.associate = (models) => {
    Favorite.belongsTo(models.User, { foreignKey: 'userId' });
    Favorite.belongsTo(models.Restaurant, { foreignKey: 'restaurantId' });
  };
  
  return Favorite;
};