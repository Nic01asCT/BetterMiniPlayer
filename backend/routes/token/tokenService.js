const crypto = require('crypto')
const qs = require('query-string')
const axios = require('axios')

const { get } = require('../env/env')

const generateRandomString = (length) => {
    return crypto.randomBytes(60).toString('hex').slice(0, length)
}

async function login(req, res, next) {
    res.redirect(`https://accounts.spotify.com/authorize?${qs.stringify({
        client_id: get('CLIENT_ID'),
        response_type: 'code',
        redirect_uri: get(`REDIRECT_URI`),
        state: generateRandomString(16),
        scope: 'user-read-playback-state user-modify-playback-state user-read-currently-playing'
    })}`)
}

async function callback(req, res, next) {
    const code = req.query.code || null
    const state = req.query.state || null
    
    if (state === null) {
        res.redirect(`/#${ qs.stringify({ error: 'state_mismatch' }) }`)
    } else {
        var authOptions = {
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code,
                redirect_uri: 'http://localhost:3000/test',
                grant_type: 'authorization_code'
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(`${get('CLIENT_ID')}:${get('CLIENT_SECRET')}`).toString('base64'))
            },
            json: true
        }
    }
    
    next()
}

module.exports = {
    login,
    callback
}