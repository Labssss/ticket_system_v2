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
            const {rows} = await db.query('SELECT * FROM api.tickets WHERE user_id = $1 ORDER BY id', [user_id])
            res.json(rows)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Get tickets error'})
        }
    }

    async getOneTicket(req, res) {
        const id = req.params.id
        const useful = await db.query('SELECT * FROM useful WHERE id = $1', [id])
        res.json(useful.rows[0])
    }

    async updateTicket(req, res) {
        const {id, title, description, url} = req.body
        const useful = await db.query('UPDATE useful SET title = $1, description = $2, url = $3 WHERE id = $4 RETURNING *', [title, description, url, id])
        res.json(useful.rows[0])
    }

    async deleteTicket(req, res) {
        const id = req.params.id
        const useful = await db.query('DELETE FROM useful WHERE id = $1', [id])
        res.json(useful.rows[0])
    }
}

module.exports = new TicketsController()