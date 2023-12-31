const User = require('../Models/User.model')
const bcrypt = require('bcrypt');
const { authSchema } = require('../helpers/validation_schema');
const Schedule = require('../Models/Schedule.Model');
const Course = require('../Models/Course.Model');
const Sequelize = require("sequelize")
const Op = Sequelize.Op;
module.exports = {
    addCourse: async (req, res, next) => {
        try {
            var { name, description, price, duration, level, topics } = req.body;
            const { startDate, endDate, classDays, classTime } = req.body.schedule;
            const schedule = await Schedule.create({ startDate, endDate, classDays, classTime });
            const course = await Course.create({ name, description, price,duration, level, topics })
            await schedule.addCourse(course);
            res.send({ success: true, message: `${course.name} course has been added along with schedule` })
        } catch (error) {
            next(error)
        }
    },

    getCourses: async (req, res, next) => {
        try {


            const courses = await Course.findAll({ include: 'schedule' })
            res.send({ success: true, message: courses })
        } catch (error) {
            if (error.isJoi === true)
                error.status = 422
            next(error)
        }
    },

    getCourseById: async (req, res, next) => {
        try {
            const course = await Course.findOne({
                include: 'schedule', where: {
                    id: req.params.id
                }
            })
            res.send({ success: true, message: course })

        } catch (error) {
            next(error)
        }
    },
    deleteById: async (req, res, next) => {
        try {
            const course = await Course.findOne({
                include: 'schedule', where: {
                    id: req.params.id
                }
            })
            if(course){
                const courseName= course.name;
                await course.destroy();
                res.send({ success: true, message: `${courseName} course has been deleted` })
            }
            else{
                const err = new Error('Course is not found');
                err.statusCode = 404
                next(err)
            }

        } catch (error) {
            next(error)
        }
    },
    updateById: async (req, res, next) => {
        var { name, description, price, duration, level, topics } = req.body;
        const { startDate, endDate, classDays, classTime } = req.body.schedule;
        const newCourse={ name, description, price, duration, level, topics };
        const newSchedule={ startDate, endDate, classDays, classTime } ;
        try {
            const course = await Course.findOne({
                include: 'schedule', where: {
                    id: req.params.id
                }
            })
            if(course){
                Object.keys(newCourse).forEach(function(key) {
                    if (newCourse[key] === undefined) {
                      delete newCourse[key];
                    }
                  }); 
                course.update(newCourse)
                const schedule = await Schedule.findOne({
                    where: {
                        id:course.scheduleId
                    }
                })
                
                if(schedule){
                    Object.keys(newSchedule).forEach(function(key) {
                        if (newSchedule[key] === undefined) {
                          delete newSchedule[key];
                        }
                      }); 
                    schedule.update(newSchedule)
                }
                const courseUpdated = await Course.findOne({
                    include: 'schedule', where: {
                        id: req.params.id
                    }
                })
                res.send({ success: true, message: courseUpdated })
            }
            else{
                const err = new Error('Course is not found');
                err.statusCode = 404
                next(err)
            }

        } catch (error) {
            next(error)
        }
    },
}