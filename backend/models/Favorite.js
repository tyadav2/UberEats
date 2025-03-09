'use strict';
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

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

// Define associations properly
Favorite.belongsTo(require("./User"), { foreignKey: 'userId' });
Favorite.belongsTo(require("./Restaurant"), { foreignKey: 'restaurantId' });

module.exports = Favorite;
