import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import SettingsContext from './component/settings/settingsContext'
import StageContext from './component/stage/stageContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <SettingsContext>
            <StageContext>
                <App />
            </StageContext>
        </SettingsContext>
    </React.StrictMode>,
)