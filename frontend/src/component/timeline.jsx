import { useState, useEffect, useRef } from 'react'

import { useStage } from './stage/stageContext'
import { useSpotify } from '../api/playback/spotifyContext'

import styles from './timeline.module.css'

export default function Timeline() {
    const { player, state } = useSpotify()
    const { stage } = useStage()

    const [duration, setDuration] = useState(143000)
    const [current, setCurrent] = useState(0)
    const [isDragging, setIsDragging] = useState(false)

    const intervalRef = useRef(null)

    const handleDown = (e) => {
        setIsDragging(true)
    }

    const handleUp = (e) => {
        setIsDragging(false);

        if (state && current !== undefined) player.seek(current)
    }
    
    const handleChange = (e) => {
        const newPosition = parseInt(e.target.value, 10)
        setCurrent(newPosition)
    }

    const formatTime = (ms) => {
        let time = Math.floor(ms / 1000)
    
        const hours = Math.floor(time / 3600)
        const minutes = Math.floor((time % 3600) / 60)
        const seconds = time % 60
    
        return [
            hours > 0 ? hours : null,
            String(minutes).padStart(hours > 0 ? 2 : 1, '0'),
            String(seconds).padStart(2, '0')
        ].filter(Boolean).join(':')
    }

    useEffect(() => {
        if (state && !isDragging) {
            const currentTrack = state.track_window.current_track
            setDuration(currentTrack.duration_ms)
            setCurrent(state.position)
        }
    }, [state, isDragging])

    useEffect(() => {
        if (state && !state.paused) {
            intervalRef.current = setInterval(() => {
                setCurrent((prev) => Math.min(prev + 100, duration))
            }, 100)
        } else {
            clearInterval(intervalRef.current)
            if (state) setCurrent(state.position)
        }

        return () => clearInterval(intervalRef.current)
    }, [state, duration])

    return (
        <div className={styles.wrapper}>
            <span className={`${styles.media} ${stage > 0 && stage < 3 ? styles.hover : ''}`}>
                <div>{formatTime(current)}</div>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                </span>
            </span>
            <input type='range' min='0' max={duration} value={current} onMouseDown={handleDown} onMouseUp={handleUp} onChange={handleChange} className={styles.slider}/>
            <span className={`${styles.media} ${stage > 0 && stage < 3 ? styles.hover : ''}`}>
                <div>{`-${formatTime(duration - current)}`}</div>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M18.4 445c11.2 5.3 24.5 3.6 34.1-4.4L224 297.7 224 416c0 12.4 7.2 23.7 18.4 29s24.5 3.6 34.1-4.4L448 297.7 448 416c0 17.7 14.3 32 32 32s32-14.3 32-32l0-320c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 118.3L276.5 71.4c-9.5-7.9-22.8-9.7-34.1-4.4S224 83.6 224 96l0 118.3L52.5 71.4c-9.5-7.9-22.8-9.7-34.1-4.4S0 83.6 0 96L0 416c0 12.4 7.2 23.7 18.4 29z"/></svg>
                </span>
            </span>
        </div>
    )
}