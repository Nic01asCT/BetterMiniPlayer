const clientId = 'f11bb9d8a7b2437793044450288f8efd'
const clientSecret = 'debd4c63996a4dd286c0371a259fe130'

const base_api_url = 'https://api.spotify.com/v1'

let token = ''

export async function auth() {
    if (token.expires > new Date().getTime()) return true

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    })

    const data = await res.json()
    token = { expires: new Date().getTime() + data.expires_in, access_token: 'Bearer ' + data.access_token}
    return data
}

export async function pause() {
    console.log(await auth())

    const result = await fetch(`${base_api_url}/me/player/pause?device_id=87b9a60ebf6c8d52127902c8349c5cfc45f77322`, {
        method: 'PUT',
        headers: { 'Authorization' : token.access_token }
    });

    const data = await result.json();
    return data.categories.items;
}