const crypto = require('crypto')
const qs = require('query-string')

const { get } = require('../env/env')

const generateRandomString = (length) => {
    return crypto.randomBytes(60).toString('hex').slice(0, length)
}

async function login(req, res, next) {
    res.redirect(`https://accounts.spotify.com/authorize?${qs.stringify({
        response_type: 'code',
        client_id: get(`CLIENT_ID`),
        scope: 'user-read-private user-read-email',
        redirect_uri: get(`REDIRECT_URI`),
        state: generateRandomString(16)
    })}`)

    next()
}

async function callback(req, res, next) {
    const code = req.query.code || null
    const state = req.query.state || null

    if (state === null) {
        res.redirect(`/#${ querystring.stringify({ error: 'state_mismatch' }) }`)
    } else {
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code,
                redirect_uri: get(`REDIRECT_URI`),
                grant_type: 'authorization_code'
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(`${get(`CLIENT_ID`)}:${get('CLIENT_SECRET')}`).toString('base64'))
            },
            json: true
        }

        console.log(authOptions)
    }
}
  

module.exports = {
    login,
    callback
}