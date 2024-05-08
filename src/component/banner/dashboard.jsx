import { useState } from 'react'

import Setting from './settings'

import styles from './dashboard.module.css'

export default function Dashboard({ open }) {
    const [img, setImg] = useState('../../src/assets/preset/cover.png')

    return (
        <div className={`${styles.wrapper} ${open ? styles.open : styles.closed}`}>
            <Setting />
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