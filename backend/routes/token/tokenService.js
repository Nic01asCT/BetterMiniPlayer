const qs = require('query-string')
const crypto = require('crypto')
const axios = require('axios')

const { get } = require('../env/env')

const redirect_uri = get(`REDIRECT_URI`)

const generateRandomString = (length) => {
    return crypto.randomBytes(60).toString('hex').slice(0, length)
}

async function login(req, res, next) {
    res.redirect(`https://accounts.spotify.com/authorize?${qs.stringify({
        client_id: get('CLIENT_ID'),
        response_type: 'code',
        redirect_uri,
        state: generateRandomString(16),
        scope: 'user-read-playback-state user-modify-playback-state user-read-currently-playing'
    })}`)

    next()
}

async function callback(req, res, next) {
    const code = req.query.code || null
    const state = req.query.state || null
    
    if (state === null) {
        res.redirect(`/#${ qs.stringify({ error: 'state_mismatch' }) }`)
    } else {
        const authOptions = {
            method: 'POST',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${get('CLIENT_ID')}:${get('CLIENT_SECRET')}`).toString('base64')
            },
            data: qs.stringify({
                code,
                redirect_uri,
                grant_type: 'authorization_code'
            })
        }

        try {
            const tokenResponse = await axios(authOptions)

            if (tokenResponse.status != 200) return res.redirect(`/#${qs.stringify({ error: 'invalid_token' })}`)
            const { access_token, refresh_token } = tokenResponse.data;

            res.token = { access_token, refresh_token }
        } catch (err) {
            console.error('Error during token exchange or user info fetch:', err.message)
            res.redirect(`/#${qs.stringify({ error: 'invalid_token' })}`)
        }
    }

    next()
}

async function refresh(req, res, next) {
    const refresh_token = req.query.refresh_token;

    const authOptions = {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${get('CLIENT_ID')}:${get('CLIENT_SECRET')}`).toString('base64')
        },
        data: qs.stringify({
            grant_type: 'refresh_token',
            refresh_token
        })
    }

    try {
        const response = await axios(authOptions)

        if (response.status != 200) return res.status(response.status).send({ error: 'Failed to refresh token', details: response.data })
        const { access_token, refresh_token } = response.data

        res.token = { access_token, refresh_token }
    } catch (err) {
        console.error('Error during token refresh:', err.message)
        res.status(500).send({ error: 'Internal Server Error', message: err.message })
    }

    next()
}

module.exports = {
    login,
    callback,
    refresh
}
