import { useState } from 'react'

import { useStage } from './stage/stageContext'

import Volume from './volume'
import Settings from './settings/settings'

import styles from './dahsboard.module.css'

export default function Dashboard() {
    const { stage } = useStage()
    
    const [artists, setArtists] = useState(['artist1', 'artist2', 'artist3'])
    const [img, setImg] = useState('../../src/assets/preset/cover.png')

    return (
        <div className={`${styles.wrapper} ${stage >= 4 ? styles.open : ''}`}>
            <span className={styles.cover}>
                <img src={img} alt='cover' />
            </span>
            <div className={styles.info}>
                <h2 className={stage >= 5 ? styles.show : ''}>Some song</h2>
                <div className={stage >= 5 ? styles.show : ''}>
                    {artists.map((e, i) => <span className={styles.artists} key={i}><a >{e}</a>{i < artists.length - 1 && ', '}</span>)}
                </div>
            </div>
            <Volume />
            <Settings />
        </div>
    )
}