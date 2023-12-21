const express = require("express")
const router= express.Router()
const CourseService=require("../Services/Course.Service")

router.post('/',CourseService.addCourse)

router.get('/',CourseService.getCourses)
router.get('/:id',CourseService.getCourseById)
// router.get('/course',CourseService.getCourseBySearch)

// router.post('/refresh-token',UserService.refreshToken)

router.delete('/:id/delete',CourseService.deleteById)
module.exports=router;