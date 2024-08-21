import { useState } from 'react'

import { useStage } from './stage/stageContext'

import styles from './timeline.module.css'

export default function Timeline() {
    const { stage } = useStage()

    const [duration, setDuration] = useState(143000)
    const [current, setCurrent] = useState(0)

    const handleChange = (e) => {
        setCurrent(e.target.value)
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

    return (
        <div className={styles.wrapper}>
            <span className={`${styles.media} ${stage > 0 && stage < 3 ? styles.hover : ''}`}>
                <div>{formatTime(current)}</div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241V96c0-17.7-14.3-32-32-32S0 78.3 0 96V416c0 17.7 14.3 32 32 32s32-14.3 32-32V271l11.5 9.6 192 160z"/></svg>
            </span>
            <input type='range' min='0' max={duration} value={current} onChange={handleChange} className={styles.slider}/>
            <span className={`${styles.media} ${stage > 0 && stage < 3 ? styles.hover : ''}`}>
                <div>{`-${formatTime(duration - current)}`}</div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z"/></svg>
            </span>
        </div>
    )
}