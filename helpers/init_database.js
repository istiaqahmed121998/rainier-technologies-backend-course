const { Sequelize } = require('sequelize');
const config = require('../config')[process.env.NODE_ENV || 'development'];
const log = config.log();
const {DATABASE_HOST,DATABASE_NAME,DATABASE_PASSWORD,DATABASE_USERNAME}=require("../config").development.database

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD,{
    host: DATABASE_HOST,
    dialect: 'postgres'
});
(async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()


module.exports=sequelize;