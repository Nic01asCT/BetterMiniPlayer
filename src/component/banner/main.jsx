import { useState } from 'react'

import Timeline from './timeline'
import Dashboard from './dashboard'

import styles from './main.module.css'

export default function Banner() {
    const [active, setActive] = useState(false)

    return (
        <div className={`${styles.wrapper} ${active ? styles.inactive_wrapper : styles.active_wrapper}`}>
            <span></span>
            <div className={styles.trigger} onClick={() => setActive(prev => !prev)}>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></svg>
                </span>
            </div>
            {<Dashboard open={active} />}
            <Timeline />
        </div>
    )
}