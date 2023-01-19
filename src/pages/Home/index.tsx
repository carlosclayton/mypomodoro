import {HandPalm, Play} from "phosphor-react";
import {ButtonStartContainer, ButtonStopContainer, HomeContainer,} from "./styles";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useContext} from "react";
import {Countdown} from "../components/Countdown";
import {NewFormCycle} from "../components/NewFormCycle";
import {FormProvider} from "react-hook-form";
import {CycleContext} from "../../contexts/CycleContext";

const formValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe uma tarefa'),
    minutes: zod.number().min(5).max(60)
});

type newCycleFormData = zod.infer<typeof formValidationSchema>

export function Home() {

    const {activeCycle, handleFormSubmit,handleInterruptCycle} = useContext(CycleContext);
    const newCycleForm = useForm<newCycleFormData>({
        resolver: zodResolver(formValidationSchema),
        defaultValues: {
            task: '',
            minutes: 0
        }
    });

    const { handleSubmit, watch, reset} = newCycleForm

    function handleCreateNewCycle(data: newCycleFormData){
        handleFormSubmit(data)
        reset()
    }


    const task = watch('task');
    const isSubmitDisabled = !task
    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                    <FormProvider {...newCycleForm}>
                        <NewFormCycle/>
                    </FormProvider>
                    <Countdown/>


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
