const Router = require('express')
const router = new Router();
const controller = require('../controller/tickets.controller')
const roleMiddleware = require('../middleware/roleMiddleware')
const {check} = require("express-validator")

router.get('/tickets', roleMiddleware(["USER"]), controller.getTickets)
router.post('/tickets', roleMiddleware(["USER"]), [
    check('title', "title не может быть пустым").notEmpty(),
    check('message', "message не может быть пустым").notEmpty(),
    check('lastName', "lastName не может быть пустым").notEmpty(),
    check('phone', "Номер телефона не может быть пустым").notEmpty(),
    check('email', "Почтовый адрес в неверном формате").isEmail(),
    check('feedbackType', "Тип обратной свзязи не может быть пустым").notEmpty()
], controller.createTicket)
router.put('/tickets/:id', roleMiddleware(["USER"]), controller.cancelTicket)

router.get('/tickets/all', roleMiddleware(["ADMIN"]), controller.getAllTickets)
router.put('/tickets/all/:id', roleMiddleware(["ADMIN"]), controller.confirmTicket)

module.exports = router