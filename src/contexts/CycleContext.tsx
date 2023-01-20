import {createContext, ReactNode, useReducer, useState} from "react";
import {ActionTypes, addNewCycleAction, interruptCycleAction, markCurrentCycleAction} from "../reducers/cycles/action";
import {Cycle} from "../interfaces/Cycle";

interface CycleContextProps {
    cycles: Cycle[],
    activeCycle: Cycle | undefined,
    activeCycleId: string | null
    amountSecondsPassed: number,
    markCurrentCycleAsFinished: () => void,
    setSecondPassed: (n: number) => void,
    handleFormSubmit: (data: newCycleFormData) => void,
    handleInterruptCycle: () => void

}

export const CycleContext = createContext({} as CycleContextProps)

interface newCycleFormData {
    task: string,
    minutes: number
}

interface CycleContextProviderProps {
    children: ReactNode
}

interface CycleState {
    cycles: Cycle[],
    activeCycleId: string | null
}

export function CycleContextProvider({children}: CycleContextProviderProps) {
    const [cycleState, dispatch] = useReducer(
        (state: CycleState, action: any) => {
            switch (action.type){
                case ActionTypes.ADD_NEW_CYCLE:
                    return {
                        ...state,
                        cycles: [...state.cycles, action.payload.cycle],
                        activeCycleId: action.payload.cycle.id
                    }
                case ActionTypes.INTERRUPT_CURRENT_CYCLE:

                    return {
                        ...state,
                        cycles: state.cycles.map((cycle) => {
                            if (cycle.id === state.activeCycleId) {
                                return {...cycle, interruptDate: new Date()}
                            } else {
                                return cycle
                            }
                        }),
                        activeCycleId: null
                    }

                case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
                    return {
                        ...state,
                        cycles: state.cycles.map((cycle) => {
                            if (cycle.id === state.activeCycleId) {
                                return {...cycle, finishedDate: new Date()}
                            } else {
                                return cycle
                            }
                        }),
                        activeCycleId: null
                    }

            }

            return state
        }, {
            cycles: [],
            activeCycleId: null
        }
    )
    const {cycles, activeCycleId} = cycleState

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function setSecondPassed(n: number) {
        setAmountSecondsPassed(n)
    }

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAction())
    }


    function handleFormSubmit(data: newCycleFormData) {
        const id = String(new Date().getTime());

        const cycle: Cycle = {
            id,
            task: data.task,
            minutes: data.minutes,
            startDate: new Date()
        }

        dispatch(addNewCycleAction(cycle))

        setAmountSecondsPassed(0)
    }

    function handleInterruptCycle() {
        dispatch(interruptCycleAction())
    }

    return (
        <CycleContext.Provider value={{
            cycles,
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondPassed,
            handleFormSubmit,
            handleInterruptCycle
        }}>
            {children}
        </CycleContext.Provider>
    )
}
