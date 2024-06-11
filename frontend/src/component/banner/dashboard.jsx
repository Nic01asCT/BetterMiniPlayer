import { useState } from 'react'

import Setting from './settings'

import styles from './dashboard.module.css'
import vol from './volume.module.css'

export default function Dashboard({ open }) {
    const [img, setImg] = useState('../../src/assets/preset/cover.png')
    const [mouseDown, setMouseDown] = useState(false)

    const handleMove = (e) => {
        if (!mouseDown) return false
        getPercentage(e)
    }

    const handleUp = (e) => {
        setMouseDown(false)
        getPercentage(e)
    }

    const getPercentage = (e) => {
        const sliderHeight = e.currentTarget.clientHeight
        const clickY = sliderHeight - (e.clientY - e.currentTarget.getBoundingClientRect().top)
        const newValue = (clickY / sliderHeight) * 100
        document.documentElement.style.setProperty('--volume', `${newValue}%`)
        return newValue
    }

    return (
        <div className={`${styles.wrapper} ${open ? styles.open : styles.closed}`}>
            <Setting open={open} />
            <div className={`${vol.wrapper} ${styles.vol}`}>
                <span className={vol.vol}>
                    <div className={vol.slider} onMouseDown={() => setMouseDown(true)} onMouseMove={e => handleMove(e)} onMouseUp={e => handleUp(e)}></div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM412.6 181.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5z"/></svg>
                </span>
            </div>
            <img className={styles.cover} src={img} alt='cover' />
            <div>
                <h2>{'Unlock It (feat. Playboi Carti)'}</h2>
                <p>ABRA, Playboi Carti, Boyz Noize</p>
                <div className={styles.media}>
                    <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241V96c0-17.7-14.3-32-32-32S0 78.3 0 96V416c0 17.7 14.3 32 32 32s32-14.3 32-32V271l11.5 9.6 192 160z"/></svg></span>
                    <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg></span>
                    <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z"/></svg></span>
                </div>
            </div>
        </div>
    )
}