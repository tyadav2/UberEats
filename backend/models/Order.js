const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Restaurant = require("./Restaurant");

const Order = sequelize.define("Order", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: "id" } },
    userEmail: { type: DataTypes.STRING(100), allowNull: false },
    restaurantId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Restaurant, key: "id" } },
    restaurantName: { type: DataTypes.STRING(100), allowNull: false },
    totalAmount: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.ENUM("Pending", "Preparing", "Delivered", "On the way", "Cancelled"), defaultValue: "Pending" },
    estimatedDeliveryTime: { type: DataTypes.STRING(20), allowNull: true },
    paymentMethod: { type: DataTypes.ENUM("Credit Card", "Cash", "Online"), allowNull: false },
    items: { type: DataTypes.JSON, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: false });

module.exports = Order;
