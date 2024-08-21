export async function login() {
    const res = await fetch('http://localhost:3000/api/token/login')

    const data = await res.json()
    return data
}

/*export async function auth() {
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
}*/