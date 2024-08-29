export const saveSettings = (settings) => {
    localStorage.setItem('appSettings', JSON.stringify(settings))
}

export const loadSettings = () => {
    const settings = localStorage.getItem('appSettings')
    return settings
        ? JSON.parse(settings)
        : {
            paused: false,
            progress: 0,
            position: 0,
            repeat_mode: 0,
            shuffle: 0,
            volume: 50
        }
}