const express = require('express')
const router = express.Router()

const { login, callback } = require('./tokenService')

router.get('/login', login, (req, res) => { })

router.get('/callback', callback, (req, res) => {
    res.status(200)
})

module.exports = router