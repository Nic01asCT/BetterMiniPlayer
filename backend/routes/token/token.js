const express = require('express')
const router = express.Router()

const { login, callback, refresh } = require('./tokenService')

router.get('/test', (req, res) => {
    res.status(200).json({ message: 'test positive' })
})

router.get('/login', login, (req, res) => { })

router.get('/callback', callback, (req, res) => { })

router.get('/refresh', refresh, (req, res) => { })

module.exports = router
