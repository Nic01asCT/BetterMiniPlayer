import { createContext, useContext, useState, useEffect } from 'react'
import { saveSettings as saveLocaly, loadSettings as loadLocaly } from './storage'

const SettingsContext = createContext()

export const useSettings = () => useContext(SettingsContext)

export default function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(loadLocaly())

    useEffect(() => {
        saveLocaly(settings)
    }, [settings])

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            { children }
        </SettingsContext.Provider>
    )
}