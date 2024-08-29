export const initializePlayer = async (token, onStateChange, onDeviceReady) => {
    const Spotify = await loadSpotifySDK()

    const player = new window.Spotify.Player({
        name: 'BetterMiniPlayer',
        getOAuthToken: cb => { cb(token) },
        volume: JSON.parse(localStorage.getItem('appSettings')).volume / 100
    })

    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
        onDeviceReady(device_id)
    })

    player.addListener('player_state_changed', state => {
        if (!state) return
        onStateChange(state)
    })

    player.connect()

    return player
}

export const getPlayerState = player => {
    return player.getCurrentState().then(state => {
        if (!state) console.error('User is not playing music through the Web Playback SDK')
        return state
    })
}

export const playPause = player => {
    player.togglePlay()
}

export const nextTrack = player => {
    player.nextTrack()
}

export const previousTrack = player => {
    player.previousTrack()
}

export const getVolume = async player => {
    return await player.getVolume()
}

export const setVolume = (player, volume) => {
    player.setVolume(volume)
}

const loadSpotifySDK = () => {
    return new Promise((resolve, reject) => {
        if (window.Spotify && window.Spotify.Player) {
            resolve(window.Spotify)
            return
        }

        if (document.getElementById('spotify-sdk')) {
            window.onSpotifyWebPlaybackSDKReady = () => resolve(window.Spotify)
            return
        }

        const script = document.createElement('script')
        script.id = 'spotify-sdk'
        script.src = "https://sdk.scdn.co/spotify-player.js"
        script.async = true

        script.onload = () => {
            window.onSpotifyWebPlaybackSDKReady = () => { resolve(window.Spotify) }
        }

        script.onerror = () => { reject(new Error('Spotify SDK failed to load')) }

        document.body.appendChild(script)
    })
}