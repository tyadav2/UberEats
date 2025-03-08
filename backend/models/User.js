const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    name: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    email: { 
        type: DataTypes.STRING(100), 
        allowNull: false, unique: true 
    },
    city: { 
        type: DataTypes.STRING(100), 
        allowNull: true 
    },
    state: { 
        type: DataTypes.STRING(100), 
        allowNull: true 
    },
    country: { 
        type: DataTypes.STRING(100), 
        allowNull: true 
    },
    phoneNumber: { 
        type: DataTypes.STRING(15), 
        allowNull: true 
    },
    dob: { 
        type: DataTypes.DATEONLY, 
        allowNull: true 
    },
    profilePic: { 
        type: DataTypes.STRING(255), 
        allowNull: true 
    },
    password: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
    },
    createdAt: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    }
}, { timestamps: false });

module.exports = User;
