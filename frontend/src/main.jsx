import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import SettingsContext from './component/settings/settingsContext'
import StageContext from './component/stage/stageContext'
import SpotifyContext from './api/playback/spotifyContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <SettingsContext>
            <StageContext>
                <SpotifyContext>
                    <App />
                </SpotifyContext>
            </StageContext>
        </SettingsContext>
    </React.StrictMode>,
)