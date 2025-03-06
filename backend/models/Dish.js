// models/Dish.js
const { DataTypes } = require("sequelize");
const db = require("../config/database"); // Adjust the path to your database config

const Dish = db.define("Dish", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.STRING, // Or DataTypes.TEXT if you expect longer text
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING, // URL or path to image
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING, // e.g., Appetizer, Salad, Main Course
    allowNull: false,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Dish;
