const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../helpers/init_database")

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

    },
    hashPassword:{
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    // Other model options go here
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

module.exports=User;