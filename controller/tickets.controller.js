const db = require('../db.js')
const { validationResult } = require('express-validator')

class TicketsController {
    async createTicket(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при создании тикета", errors})
            }

            const user_id = req.user.id
            const {title, message, firstName, lastName, phone, email, feedbackType} = req.body
            const {rows: [ticket, ...any]}  = await db.query('INSERT INTO api.tickets (user_id, title, message, firstName, lastName, phone, email, feedbackType) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [user_id, title, message, firstName, lastName, phone, email, feedbackType])
            res.json({message: `Заявка №${ticket.id} успешно создана`})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Creation ticket error'})
        }
    }

    async getTickets(req, res) {
        try {
            const user_id = req.user.id
            const {rows} = await db.query('SELECT id, title, message, firstname, lastname, phone, email, status, created_at FROM api.tickets WHERE user_id = $1 ORDER BY id', [user_id])
            res.json(rows)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Get tickets error'})
        }
    }

    async getAllTickets(req, res) {
        try {
            if (req.query.order === 'open') {
                const {rows} = await db.query('SELECT * FROM api.tickets WHERE status = $1 ORDER BY id', ["ОТКРЫТА"])
                return res.json(rows)
            } 
            const {rows} = await db.query('SELECT * FROM api.tickets ORDER BY id')
            res.json(rows)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Get all tickets error'})
        }
    }

    async cancelTicket(req, res) {
        try {
            const user_id = req.user.id
            const ticket_id = req.params.id
            if (req.query.cancel) {
                const {rows: [ticket, ...any]} = await db.query('UPDATE api.tickets SET status = $1 WHERE id = $2 AND user_id = $3 RETURNING id, title, message, firstname, lastname, phone, email, status, created_at', ['ОТМЕНЕНА', ticket_id, user_id])
                res.json(ticket)
            }    
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Cancel ticket error'})
        }
    }

    async confirmTicket(req, res) {
        try {
            const ticket_id = req.params.id
            if (req.query.confirm) {
                const {rows: [ticket, ...any]} = await db.query('UPDATE api.tickets SET status = $1 WHERE id = $2 RETURNING *', ['РЕШЕНА', ticket_id])
                res.json(ticket)
            }     
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Cancel ticket error'})
        }
    }
}

module.exports = new TicketsController()