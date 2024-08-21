import { createContext, useContext, useState, useEffect } from 'react'

const StageContext = createContext()

export const useStage = () => useContext(StageContext)

export default function StageProvider({ children }) {
    const [stage, setStage] = useState(0)
    const [stageBuffer, setStageBuffer] = useState(0)
    const [cooldown, setCooldown] = useState(false)
    const maxStages = 5

    const stageUp = () => {
        if (cooldown || stage >= maxStages) return
        
        setStage(prev => prev + 1)
        setCooldown(true)
        setTimeout(() => { setCooldown(false) }, 500)
    }
    
    const stageDown = () => {
        if (cooldown || stage <= 0) return
        
        setStage(prev => prev - 1)
        setCooldown(true)
        if (stage == 5) return setTimeout(() => { setCooldown(false) }, 1000)
        setTimeout(() => { setCooldown(false) }, 500)
    }
    
    const stageBufferUp = () => {
        if (stage >= maxStages) return
        setStageBuffer(prev => prev + 1)
    }
    
    const stageBufferDown = () => {
        if (stage <= 0) return
        setStageBuffer(prev => prev - 1)
    }

    const setBuffer = (newS) => {
        if (newS > maxStages || newS < 0) return
        setStageBuffer(newS)
    }

    useEffect(() => {
        if (stageBuffer > stage && !cooldown) {
            stageUp()
        } else if (stageBuffer < stage && !cooldown) {
            stageDown()
        }
    }, [stageBuffer, stage, cooldown])

    return (
        <StageContext.Provider value={{ stage, maxStages, stageBuffer, changeBuffer: { up: stageBufferUp, down: stageBufferDown, set: setBuffer } }}>
            { children }
        </StageContext.Provider>
    )
}