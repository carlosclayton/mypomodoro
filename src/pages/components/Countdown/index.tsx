import {CountDownContainer, Separator} from "./styles";

import {useContext, useEffect, useState} from "react";
import {differenceInSeconds} from "date-fns";
import {CycleContext} from "../../../contexts/CycleContext";

export function Countdown(){
    const { activeCycle, activateCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondPassed } = useContext(CycleContext);

    const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0;

    useEffect(() => {
        let interval: number;

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

                if (secondsDifference >= totalSeconds) {
                    markCurrentCycleAsFinished()
                    setSecondPassed(totalSeconds)
                    clearInterval(interval)
                } else {
                    setSecondPassed(secondsDifference)
                }
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, totalSeconds, activateCycleId])

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;



    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }

    }, [minutes, seconds, activeCycle])

    return(
        <CountDownContainer>
            <span>{ minutes[0] }</span>
            <span>{ minutes[1] }</span>
            <Separator>:</Separator>
            <span>{ seconds[0]}</span>
            <span>{ seconds[1] }</span>
        </CountDownContainer>
    )
}
