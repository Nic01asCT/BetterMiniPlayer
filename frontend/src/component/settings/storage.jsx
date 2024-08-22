export const saveSettings = (settings) => {
    localStorage.setItem('appSettings', JSON.stringify(settings))
}

export const loadSettings = () => {
    const settings = localStorage.getItem('appSettings')
    return settings
        ? JSON.parse(settings)
        : {
            
        }
}