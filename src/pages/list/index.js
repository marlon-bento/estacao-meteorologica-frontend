import axios from "axios";

import './style.css'
import { useQuery } from "react-query";
import {useLocation, useNavigate} from "react-router-dom";

import Aside from "../../components/Aside";
import MainHeader from "../../components/MainHeader";

function List() {
    const navigate = useNavigate();




    const {state}  = useLocation();
    const { data, isLoading, error } = useQuery("todos", () => {
        return axios
            .get("http://localhost:8080/api/v1/sensores")
            .then((response) => response.data);
    });
    console.log(data)
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

        <>
            <div className='posicao'>

                <Aside name = {state} />
                <MainHeader page={"Histórico de Leitura"} />
                <div className='list'>
                    <h1>Histórico de leituras</h1>
                    {
                        data.map((todo) => (
                            <div key={todo.id} className="sensores">
                                <div className="sensores-valores">
                                    <h1> Sensor de temperatura: <span className="valorSensor">{todo.sensorTemp + " °C"}</span></h1>
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

        </>
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
export default List;