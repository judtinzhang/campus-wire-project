const { isAuthenticated } = require('../middlewares/isAuthenticated')
const express = require('express')
const router = express.Router()

const Question = require('../models/Question')
router.get('', async (req, res, next) => {
    try {
        const questions = await Question.find()
        res.send(questions)
    } catch (err) {
        next(new Error(err))
    }
})

router.post('/add', isAuthenticated, async (req, res, next) => {
    const { questionText } = req.body
    try {
        await Question.create({ questionText, author: req.session.username })
        res.send('Question created.')
    } catch (err) {
        next(new Error(err))
    }
})

router.post('/answer', isAuthenticated, async (req, res, next) => {
    const { _id, answer } = req.body
    try {
        await Question.updateOne( { _id }, {$set: { answer }})
        res.send('Question answered.')
    } catch (err) {
        next(new Error(err))
    }
})

module.exports = router

