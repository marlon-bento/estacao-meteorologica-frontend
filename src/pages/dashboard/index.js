import Aside from '../../components/Aside';

import MainHeader from '../../components/MainHeader';

import './style.css';
import axios from "axios";
import TemperaturaxUmidade from '../../components/TemperaturaxUmidade';
import GraficoPizza from '../../components/GraficoPizza';
import { useState } from 'react';
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const [intervalo, setIntervalo] = useState("todo"); // Estado para controlar o intervalo selecionado



    const { state } = useLocation();
    const { data, isLoading, error } = useQuery("todos", () => {
        return axios
            .get("http://localhost:8080/api/v1/sensores")
            .then((response) => response.data);
    });

    if (isLoading) {
        return <div className="loading">carregando...</div>
    }
    if (error) {
        return (
            <>
                <h1 className="erroHistorico">Histórico não encontrado</h1>
            </>
        );
    }

    return (

        <div className='posicao'>

            <Aside />
            <MainHeader page={"Dashboard"} />
            <div className='dashboard'>
                <div className="controls">
                    {/* Input select para escolher o intervalo */}
                    <span>filtar por: </span>
                    <select value={intervalo} onChange={e => setIntervalo(e.target.value)}>
                        <option value="todo">Todo o histórico</option>
                        <option value="este">Este Mês</option>
                    </select>
                </div>
                <TemperaturaxUmidade dados={data} intervalo={intervalo} />
                <GraficoPizza data={data} />
                <div className='list'>
                    <h1>Histórico de leituras</h1>
                    {
                        data.map((todo) => (
                            <div key={todo.id} className="sensores">
                                <div className="sensores-valores">
                                    <h1> Sensor de temperatura: <span className="valorSensor">{todo.sensorTemp}</span></h1>
                                    <h1> Sensor de umidade: <span className="valorSensor">{todo.sensorUmidade}</span></h1>
                                    <h1> Sensor de pressão: <span className="valorSensor">{todo.sensorPressao}</span></h1>

                                </div>
                                <div>
                                    <h1 id="bold" > data de salvamento: {formatar_data(todo.dataCriacao)}</h1>
                                </div>

                            </div>
                        ))
                    }
                </div>

            </div>



        </div>

    );

}
function formatar_data(datestring) {
    const newDate = new Date(datestring);
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'America/Sao_Paulo'
    };
    return newDate.toLocaleString('pt-BR', options);
}

export default Dashboard;