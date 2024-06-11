const express = require('express')
const router = express.Router()

const { login, callback } = require('./tokenService')

router.get('/login', login, (req, res) => {
    
})

router.get('/callback', (req, res) => {
    
})

module.exports = router