const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../helpers/init_database")

const Course = sequelize.define('course', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.DOUBLE,
        set(val) {
            if (val===null) {
                this.setDataValue('price', 0.0);
            } else {
                this.setDataValue('price', parseFloat(val));
            }
        },
        get() {
            if (this.getDataValue('price') === null || this.getDataValue('price') === undefined) {
                return "0 BDT";
            } else {
                return `${this.getDataValue('price')} BDT`;
            }
        },
        allowNull: true,
    },
    duration: {
        type: DataTypes.DOUBLE,
        set(val) {
            if (val===null) {
                this.setDataValue('duration', 0.0);
            } else {
                this.setDataValue('duration', parseFloat(val));
            }
        },
        get() {
            if (this.getDataValue('duration') === null || this.getDataValue('duration') === undefined) {
                return "0 Week";
            } else {
                return `${this.getDataValue('duration')} week`;
            }
        },
        allowNull: true,
    },
    level: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    topics: {
        type: Sequelize.STRING,
        get() {
            if (this.getDataValue('topics') === null || this.getDataValue('topics') === undefined) {
                return [];
            } else {
                return this.getDataValue('topics').split(';');
            }
        },
        set(val) {
            if (val.length === 0) {
                this.setDataValue('topics', null);
            } else {
                this.setDataValue('topics', val.join(';'));
            }
        },
        allowNull: true,
    }
}, {
    // Other model options go here
});

// `sequelize.define` also returns the model
console.log(Course === sequelize.models.Course); // true

module.exports = Course;