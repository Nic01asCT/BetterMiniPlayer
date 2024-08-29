import { useState, useEffect } from 'react'
import CryptoJS from 'crypto-js'

const client_id = 'f11bb9d8a7b2437793044450288f8efd'
const redirect_uri = 'http://localhost:5173/'
const scope = [
    'streaming',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-library-read'
].join(' ')

const generateRandomString = (length) => {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

const generateCodeChallenge = (code_verifier) => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.SHA256(code_verifier))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '')
}

export const redirectToSpotify = () => {
    const code_verifier = generateRandomString(128)
    localStorage.setItem('spotify_code_verifier', code_verifier)

    const codeChallenge = generateCodeChallenge(code_verifier)
    const state = generateRandomString(16)

    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`

    window.location = authUrl
}

export const fetchAccessToken = async (code) => {
    const code_verifier = localStorage.getItem('spotify_code_verifier')
    const tokenUrl = 'https://accounts.spotify.com/api/token'

    const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id,
            grant_type: 'authorization_code',
            code,
            redirect_uri,
            code_verifier
        })
    })

    if (response.ok) {
        const result = await response.json()
        localStorage.setItem('spotify_access_token', result.access_token)
        localStorage.setItem('spotify_refresh_token', result.refresh_token)
        localStorage.setItem('spotify_token_expiry', Date.now() + result.expires_in * 1000)
        return result
    } else {
        throw new Error('Failed to fetch access token')
    }
}

export const refreshAccessToken = async () => {
    const refresh_token = localStorage.getItem('spotify_refresh_token')
    const tokenUrl = 'https://accounts.spotify.com/api/token'

    const data = new URLSearchParams()
    data.append('client_id', client_id)
    data.append('grant_type', 'refresh_token')
    data.append('refresh_token', refresh_token)

    const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id,
            grant_type: 'refresh_token',
            refresh_token
        }),
    })

    if (response.ok) {
        const result = await response.json()
        localStorage.setItem('spotify_access_token', result.access_token)
        localStorage.setItem('spotify_token_expiry', Date.now() + result.expires_in * 1000)
        return result
    } else {
        throw new Error('Failed to refresh access token')
    }
}

export const getAccessToken = async () => {
    const tokenExpiry = localStorage.getItem('spotify_token_expiry')
    if (tokenExpiry && Date.now() < tokenExpiry) {
        return localStorage.getItem('spotify_access_token')
    } else {
        return await refreshAccessToken()
    }
}

export const useSpotifyAuth = () => {
    const [accessToken, setAccessToken] = useState(null)

    const handleAuthRedirect = async () => {
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')

        if (code) {
            const tokenData = await fetchAccessToken(code)
            setAccessToken(tokenData.access_token)
            window.history.replaceState({}, document.title, '/')
        } else {
            redirectToSpotify()
        }
    }

    useEffect(() => {
        const tokenExpiry = localStorage.getItem('spotify_token_expiry')
        const savedAccessToken = localStorage.getItem('spotify_access_token')

        if (savedAccessToken && Date.now() < tokenExpiry) {
            setAccessToken(savedAccessToken)
            window.history.replaceState({}, document.title, '/')
        } else {
            handleAuthRedirect()
        }
    }, [])

    return { accessToken }
}

export const getPlaybackstate = async () => {
    const url = 'https://api.spotify.com/v1/me/player'

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await getAccessToken()}`
        }
    })

    if (!response.ok) console.error('Failed to get playback', response.status, response.statusText)
    return response.json()
}

export const transferPlayback = async (deviceId) => {
    const url = 'https://api.spotify.com/v1/me/player'

    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
            device_ids: [deviceId],
            play: true
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await getAccessToken()}`
        }
    })

    if (!response.ok) console.error('Failed to transfer playback', response.status, response.statusText)
    else console.log('Playback transferred successfully')
}

export const checkIfLiked = async (trackId) => {
    const url = 'https://api.spotify.com/v1/me/tracks/contains'
    const response = await fetch(`${url}?ids=${trackId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${await getAccessToken()}`
        }
    })

    if (response.ok) return await response.json()
    else console.error('Failed to check if the track is liked', response.status, response.statusText)
}