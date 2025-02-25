const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Restaurant = sequelize.define("Restaurant", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  cuisine: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false });

module.exports = Restaurant;
