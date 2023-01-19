import {HistoryContainer, HistoryList, Status} from './styles'
import {CycleContext} from "../../contexts/CycleContext";
import {useContext} from "react";

export function History() {
    const {cycles} = useContext(CycleContext);
    return (

        <HistoryContainer>
            <h1>History</h1>

            <HistoryList>
                <table>
                    <thead>
                    <tr>
                        <th>Tarefa</th>
                        <th>Duração</th>
                        <th>Início</th>
                        <th>Status</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td>Tarefa</td>
                        <td>20 minutos</td>
                        <td>Há 2 meses</td>
                        <td>
                            <Status statusColor={"green"}>Concluído</Status>
                        </td>
                    </tr>
                    <tr>
                        <td>Tarefa 1</td>
                        <td>20 minutos</td>
                        <td>Há 2 meses</td>
                        <td>
                            <Status statusColor={"yellow"}>Concluído</Status>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}
