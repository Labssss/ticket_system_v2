const Router = require('express')
const router = new Router()
const controller = require('../controller/auth.controller')
const {check} = require("express-validator")
// const authMiddleware = require('./middlewaree/authMiddleware')
// const roleMiddleware = require('./middlewaree/roleMiddleware')

router.post('/registration', [
    check('email', "Почтовый адерс не может быть пустым").notEmpty(),
    check('phone', "Номер телефона не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 20 символов").isLength({min:4, max:20})
], controller.registration)
router.post('/login', controller.login)
// router.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers)

module.exports = router