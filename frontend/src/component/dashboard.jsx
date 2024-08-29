import { useState, useEffect } from 'react'

import { useSpotify } from '../api/playback/spotifyContext'
import { useStage } from './stage/stageContext'

import Volume from './volume'
import Settings from './settings/settings'

import styles from './dahsboard.module.css'

export default function Dashboard() {
    const { state } = useSpotify()
    const { stage } = useStage()
    
    const [artists, setArtists] = useState([{ name: 'artist1', uri: 'spotify:artist:0' }, { name: 'artist2', uri: 'spotify:artist:1' }])
    const [title, setTitle] = useState('Song')
    const [img, setImg] = useState('../../src/assets/preset/cover.png')

    useEffect(() => {
        const getData = async () => {
            if (!state) return
            const currentTrack = state.track_window.current_track

            setTitle(currentTrack.album.name)
            setArtists(currentTrack.artists)

            const cover = currentTrack.album.images[0].url
            setImg(currentTrack.album.images[2].url)
            const rootElement = document.querySelector(':root')
            rootElement.style.setProperty('--background-img', `url(${cover})`)
        }

        getData()
    }, [state])

    return (
        <div className={`${styles.wrapper} ${stage >= 4 ? styles.open : ''}`}>
            <span className={styles.cover}>
                <img src={img} alt='cover' />
            </span>
            <div className={`${styles.info} ${stage >= 5 ? styles.background : ''}`}>
                <h2 className={stage >= 5 ? styles.show : ''}>{title}</h2>
                <div className={stage >= 5 ? styles.show : ''}>
                    {artists.map((e, i) => <span className={styles.artists} key={i}><a href={`https://open.spotify.com/artist/${e.uri.split(':')[2]}`}>{e.name}</a>{i < artists.length - 1 && ', '}</span>)}
                </div>
            </div>
            <Volume />
            <Settings /> 
        </div>
    )
}