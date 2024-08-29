import { createContext, useContext, useState, useEffect } from 'react'

import { initializePlayer, getPlayerState, playPause, nextTrack, previousTrack, setVolume, getVolume } from './playback'
import { useSpotifyAuth, getAccessToken, getPlaybackstate, transferPlayback } from '../token'

import { useSettings } from '../../component/settings/settingsContext'

const SpotifyContext = createContext()

export const useSpotify = () => useContext(SpotifyContext)

export default function SpotifyProvider({ children }) {
    const { settings } = useSettings()
    const { accessToken } = useSpotifyAuth()

    const [state, setState] = useState(null)
    const [player, setPlayer] = useState(null)
    const [deviceId, setDeviceId] = useState(null)
    const [prevDevice, setPrevDevice] = useState(null)

    const handlePause = () => {
        playPause(player)
    }

    const handleNextTrack = () => {
        nextTrack(player)
    }

    const handlePreviousTrack = async () => {
        const pbState = await getPlaybackstate()
        if (pbState.progress_ms >= 3000) return player.seek(0)
        previousTrack(player)
    }

    const setVol = (vol) => {
        setVolume(player, vol / 100)
    }

    const getVol = async () => {
        return await getVolume(player)
    }

    useEffect(() => {
        const initSpotifyPlayer = async () => {
            let token
            if (accessToken) token = accessToken
            else token = await getAccessToken()
            const player = await initializePlayer(token, setState, setDeviceId)
            setPlayer(player)
        }

        initSpotifyPlayer()
    }, [])

    useEffect(() => {
        const trans = async () => {
            if (!deviceId) return

            /*
            const playback = await getPlaybackstate()
            if (playback) {
                setSettings(prev => ({
                    ...prev,
                    volume: playback.device.volume_percent,
                    progress: playback.progress_ms,
                    repeat_mode: playback.repeat_state == 'off' ? 0 : playback.repeat_state == 'context' ? 1 : 2,
                    shuffle: playback.shuffle_state
                }))
                setPrevDevice(playback.device)
            }
            */
            setVolume(player, settings.volume / 100)

            transferPlayback(deviceId)
        }

        trans()
    }, [deviceId])

    useEffect(() => {
        const handleUpdate = async () => {
            if (!state || state.position > 0) return
            document.title = `${state.track_window.current_track.album.name} - ${state.track_window.current_track.artists[0].name}`

            let link = document.querySelector("link[rel*='icon']") || document.createElement('link')
            link.type = 'image/x-icon'
            link.rel = 'shortcut icon'
            link.href = state.track_window.current_track.album.images[1].url
            document.getElementsByTagName('head')[0].appendChild(link)
        }

        handleUpdate()
    }, [state])

    return (
        <SpotifyContext.Provider value={{
            state,
            player,
            getPlayerState,
            handles: {
                handlePause,
                handleNextTrack,
                handlePreviousTrack,
            },
            volume: {
                set: setVol,
                get: getVol
            }
            }}>
            {children}
        </SpotifyContext.Provider>
    )
}