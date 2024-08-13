const express = require('express')
const router = express.Router()

const { login, callback, refresh } = require('./tokenService')

router.get('/login', login, (req, res) => { })

router.get('/callback', callback, (req, res) => {
    const { access_token, refresh_token } = res.token
    
    res.json({ access_token, refresh_token })
})

router.get('/refresh', refresh, (req, res) => {
    const { access_token, refresh_token } = res.token

    res.json({ access_token, refresh_token })
})

module.exports = router
