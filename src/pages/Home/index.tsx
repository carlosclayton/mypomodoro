import {HandPalm, Play} from "phosphor-react";
import {ButtonStartContainer, ButtonStopContainer, HomeContainer,} from "./styles";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as zod from "zod";
import {createContext, useState} from "react";
import {Countdown} from "../components/Countdown";
import {NewFormCycle} from "../components/NewFormCycle";
import {FormProvider} from "react-hook-form";

const formValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe uma tarefa'),
    minutes: zod.number().min(5).max(60)
});

type newCycleFormData = zod.infer<typeof formValidationSchema>

interface CycleProps {
    id: string,
    task: string,
    minutes: number,
    startDate: Date,
    interruptDate?: Date,
    finishedDate?: Date
}

interface CycleContextProps {
    activeCycle: CycleProps | undefined,
    activateCycleId: string | null
    amountSecondsPassed: number,
    markCurrentCycleAsFinished: () => void,
    setSecondPassed: (n: number) => void
}

export const CycleContext = createContext({} as CycleContextProps)

export function Home() {
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

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

    const [cycles, setCycles] = useState<CycleProps[]>([]);
    const [activateCycleId, setActivateCycleId] = useState<string | null>(null);


    const newCycleForm = useForm<newCycleFormData>({
        resolver: zodResolver(formValidationSchema),
        defaultValues: {
            task: '',
            minutes: 0
        }
    });

    const { handleSubmit, watch, reset} = newCycleForm


    const task = watch('task');
    const isSubmitDisabled = !task

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
        reset();
    }

    const activeCycle = cycles.find((cycle) => cycle.id === activateCycleId)


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
        <HomeContainer>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <CycleContext.Provider value={{ activeCycle, activateCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondPassed  }}>
                    <FormProvider {...newCycleForm}>
                        <NewFormCycle/>
                    </FormProvider>

                    <Countdown/>
                </CycleContext.Provider>

                {
                    activeCycle ? (
                        <ButtonStopContainer onClick={handleInterruptCycle} type="button">
                            <HandPalm size={24}/>
                        </ButtonStopContainer>
                    ) : (
                        <ButtonStartContainer disabled={isSubmitDisabled} type="submit">
                            <Play size={24}/>
                        </ButtonStartContainer>
                    )
                }

            </form>
        </HomeContainer>

    )
}
