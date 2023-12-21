const express = require("express")
const router= express.Router()
const CourseService=require("../Services/Course.Service")

router.post('/',CourseService.addCourse)

router.get('/',CourseService.getCourses)

router.get('/:id',CourseService.getCourseById)

router.delete('/:id/delete',CourseService.deleteById)

router.patch("/:id/update",CourseService.updateById)
module.exports=router;