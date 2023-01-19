import {createContext, ReactNode, useState} from "react";


interface CycleProps {
    id: string,
    task: string,
    minutes: number,
    startDate: Date,
    interruptDate?: Date,
    finishedDate?: Date
}

interface CycleContextProps {
    cycles: CycleProps[],
    activeCycle: CycleProps | undefined,
    activateCycleId: string | null
    amountSecondsPassed: number,
    markCurrentCycleAsFinished: () => void,
    setSecondPassed: (n: number) => void,
    handleFormSubmit: (data: newCycleFormData) => void,
    handleInterruptCycle: () => void

}

export const CycleContext = createContext({} as CycleContextProps)
interface newCycleFormData{
    task: string,
    minutes: number
}

interface CycleContextProviderProps{
    children: ReactNode
}

export function CycleContextProvider({children}: CycleContextProviderProps) {


    const [cycles, setCycles] = useState<CycleProps[]>([]);
    const [activateCycleId, setActivateCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    const activeCycle = cycles.find((cycle) => cycle.id === activateCycleId)

    function setSecondPassed(n: number){
        setAmountSecondsPassed(n)
    }
    function markCurrentCycleAsFinished(){
        setCycles(state =>
            state.map((cycle) => {
                if (cycle.id === activateCycleId) {
                    return {...cycle, finishedDate: new Date()}
                } else {
                    return cycle
                }
            }))
    }



    function handleFormSubmit(data: newCycleFormData) {
        const id = String(new Date().getTime());

        const newCycle: CycleProps = {
            id,
            task: data.task,
            minutes: data.minutes,
            startDate: new Date()
        }
        setCycles((state) => [...state, newCycle])
        setActivateCycleId(id)
        setAmountSecondsPassed(0)
    }
    function handleInterruptCycle() {
        setActivateCycleId(null)

        setCycles(state =>
            state.map((cycle) => {
                if (cycle.id === activateCycleId) {
                    return {...cycle, interruptDate: new Date()}
                } else {
                    return cycle
                }
            }))
    }

    return (
        <CycleContext.Provider value={{cycles, activeCycle, activateCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondPassed, handleFormSubmit, handleInterruptCycle  }}>
            {children}
        </CycleContext.Provider>
    )
}
