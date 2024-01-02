const express = require('express')

// 导入路由对应的处理函数
const userHandler = require("../router_handler/user.js")

const router = express.Router()


router.post('/register',userHandler.regUser)
router.post('/login',userHandler.login)
router.post('/logout',userHandler.logout)

module.exports = router