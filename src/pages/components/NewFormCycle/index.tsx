import {FormContainer, MinutesAmountInput, TaskInput} from "./styles";
import {useContext} from "react";
import {CycleContext} from "../../Home";
import {useFormContext} from "react-hook-form";

export function NewFormCycle(){
    const { activeCycle } = useContext(CycleContext);
    const {register} = useFormContext()

    return(
        <FormContainer>

            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                id="task"
                placeholder="Dê um nome para o seu projeto"
                list="suggestions"
                {...register('task')}
                disabled={!!activeCycle}
            />

            <datalist id="suggestions">
                <option value="Tarefas pela manhã"></option>
                <option value="Tarefas pela tarde"></option>
                <option value="Tarefas pela noite"></option>
            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <MinutesAmountInput
                id="minutesAmount"
                type="number"
                placeholder="00"
                step={5}
                min={1}
                max={60}
                {...register('minutes', {valueAsNumber: true})}
                disabled={!!activeCycle}
            />
            <span>
                        minutos
                    </span>

        </FormContainer>
    )
}
