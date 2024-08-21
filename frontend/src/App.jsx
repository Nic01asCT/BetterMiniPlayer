import { useStage } from './component/stage/stageContext'

import Dashboard from './component/dashboard'
import Controls from './component/controls/controls'
import Timeline from './component/timeline'

import styles from './App.module.css'

export default function App() {
    const { stage, changeBuffer } = useStage()

    const handleOn = () => {
        if (stage >= 3) return
        changeBuffer.set(2)
    }
    
    const handleOff = () => {
        if (stage >= 3) return
        changeBuffer.set(0)
    }

    const getStyles = () => {
        if (stage == 0) return styles.wrapper
        
        if (stage <= 2) return `${styles.wrapper} ${styles.hover}`
        return `${styles.wrapper} ${styles.open}`
    }

    return (
        <div onMouseEnter={handleOn} onMouseLeave={handleOff} className={getStyles()}>
            <Dashboard />
            <Controls />
            <Timeline />
        </div>
    )
}