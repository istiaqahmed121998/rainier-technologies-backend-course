const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../helpers/init_database")
const Course = require("./Course.Model")
const Schedule = sequelize.define('schedule', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: true,

    },
    endDate:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    classDays:{
        type: Sequelize.STRING,
        get() {
            return this.getDataValue('classDays').split(';')
        },
        set(val) {
           this.setDataValue('classDays',val.join(';'));
        },
    },
    classTime:{
        type: DataTypes.STRING,
    },
}, {
});
Schedule.hasMany(Course);
Course.belongsTo(Schedule);
console.log(Schedule === sequelize.models.Schedule); // true

module.exports=Schedule;