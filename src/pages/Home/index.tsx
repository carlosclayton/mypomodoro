import {Play} from "phosphor-react";
import {
    ButtonContainer,
    CountDownContainer,
    FormContainer,
    HomeContainer,
    MinutesAmountInput,
    Separator,
    TaskInput
} from "./styles";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as zod from "zod";
import {useState} from "react";

const formValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe uma tarefa'),
    minutes: zod.number().min(5).max(60)
});

type newCycleFormData = zod.infer<typeof formValidationSchema>

interface CycleProps {
    id: string,
    task: string,
    minutes: number
}

export function Home() {

    const [cycles, setCycles]  = useState<CycleProps[]>([]);
    const [activateCycleId, setActivateCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed ] = useState(0)

    const {register, handleSubmit, watch, reset} = useForm<newCycleFormData>({
        resolver: zodResolver(formValidationSchema),
        defaultValues: {
            task: '',
            minutes: 0
        }
    });


    const task = watch('task');
    const isSubmitDisabled = !task

    function handleFormSubmit(data: newCycleFormData){
        console.log(data)
        const id =  String(new Date().getTime());

        const newCycle: CycleProps = {
            id,
            task: data.task,
            minutes: data.minutes
        }
        setCycles((state) => [...state, newCycle])
        setActivateCycleId(id)
        reset();
    }

    const activeCycle = cycles.find((cycle) => cycle.id === activateCycleId)

    const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0;
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2,'0')

    console.log(activeCycle)

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <FormContainer>

                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        placeholder="Dê um nome para o seu projeto"
                        list="suggestions"
                        {...register('task')}
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
                        min={5}
                        max={60}
                        {...register('minutes', {valueAsNumber: true})}
                    />
                    <span>
                        minutos
                    </span>

                </FormContainer>

                <CountDownContainer>
                    <span>{ minutes[0] }</span>
                    <span>{ minutes[1] }</span>
                    <Separator>:</Separator>
                    <span>{ seconds[0]}</span>
                    <span>{ seconds[1] }</span>
                </CountDownContainer>

                <ButtonContainer disabled={isSubmitDisabled} type="submit">
                    <Play size={24}/>
                </ButtonContainer>

            </form>
        </HomeContainer>

    )
}
