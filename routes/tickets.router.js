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
// router.get('/useful/:id', usefulController.getOneUseful)
// router.put('/useful', usefulController.updateUseful)
// router.delete('/useful/:id', usefulController.deleteUseful)

module.exports = router