import { useState } from 'react'

import { useStage } from './stage/stageContext'

import styles from './volume.module.css'

export default function Volume() {
    const { stage } = useStage()
    
    const [current, setCurrent] = useState(5)

    const handleChange = (e) => {
        setCurrent(e.target.value)
    }

    const handleScroll = (e) => {
        let newValue = current;

        if (e.deltaY < 0) {
            newValue = Math.min(10, current + 1)
        } else if (e.deltaY > 0) {
            newValue = Math.max(0, current - 1)
        }

        setCurrent(newValue)
    }

    return (
        <div onWheel={handleScroll} className={`${styles.wrapper} ${stage == 5 ? styles.open : ''}`}>
            <input type='range' min='0' max='10' step='1' value={current} onChange={handleChange} className={styles.slider}/>
            <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM412.6 181.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5z"/></svg></span>
        </div>
    )
}