import {Cycle} from "../../interfaces/Cycle";

export enum ActionTypes {
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
    MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED'
}


export function addNewCycleAction(cycle: Cycle){
    return {
        type: ActionTypes.ADD_NEW_CYCLE,
        payload: {
            cycle
        }
    }
}

export function interruptCycleAction(){
    return {
        type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
    }
}

export function markCurrentCycleAction(){
    return {
        type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,

    }
}
