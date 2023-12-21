const express = require("express")
const router= express.Router()
const UserService=require("../Services/User.Service")

router.post('/register',UserService.register)

router.post('/login',UserService.login)


router.post('/refresh-token',UserService.refreshToken)


module.exports=router;