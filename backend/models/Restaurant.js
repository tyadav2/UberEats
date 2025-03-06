const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Restaurant = sequelize.define("Restaurant", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    cuisine: { type: DataTypes.STRING(50), allowNull: false },
    category: { type: DataTypes.STRING(50), allowNull: false },
    location: { type: DataTypes.STRING(100), allowNull: false },
    address: { type: DataTypes.STRING(255), allowNull: false },
    phone_number: { type: DataTypes.STRING(20), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    business_hours: { type: DataTypes.STRING(255), allowNull: false },
    rating: { type: DataTypes.FLOAT, defaultValue: 0.0 },
    image_url: { type: DataTypes.STRING(255), allowNull: true },
    price_range: { type: DataTypes.ENUM("$", "$$", "$$$"), allowNull: false, defaultValue: "$" },
    delivery_time: { type: DataTypes.STRING(20), allowNull: false },
    is_open: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { timestamps: false });

module.exports = Restaurant;
