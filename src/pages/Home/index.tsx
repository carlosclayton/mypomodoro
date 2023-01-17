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

export function Home() {
    return (
        <HomeContainer>
            <form action="">
                <FormContainer>

                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        placeholder="Dê um nome para o seu projeto"
                        list="suggestions"
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
                    />
                    <span>
                        minutos
                    </span>

                </FormContainer>

                <CountDownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>

                <ButtonContainer disabled type="submit">
                    <Play size={24}/>
                </ButtonContainer>

            </form>
        </HomeContainer>

    )
}
