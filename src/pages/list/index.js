import axios from "axios";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import Aside from "../../components/Aside";
import MainHeader from "../../components/MainHeader";
import './style.css';

const Carregando = () => {
    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-text">
                <span className="letter">C</span>
                <span className="letter">a</span>
                <span className="letter">r</span>
                <span className="letter">r</span>
                <span className="letter">e</span>
                <span className="letter">g</span>
                <span className="letter">a</span>
                <span className="letter">n</span>
                <span className="letter">d</span>
                <span className="letter">o</span>
                <span className="letter">.</span>
                <span className="letter">.</span>
                <span className="letter">.</span>
            </div>
        </div>
    );
};

const Erro = ({ refetchData }) => {
    return (
        <div className="error-container erro-msg">
            <h1 className="erro-text">Ocorreu um erro ao carregar os dados.</h1>
            <button className="erro-button" onClick={refetchData}>Recarregar</button>
        </div>
    );
};
function List() {
    const { state } = useLocation();
    const [loading, setLoading] = useState(true);
    const { data, isLoading, error, refetch } = useQuery("todos", () => {
        return axios
            .get("https://estacao-meteorologica-backend.onrender.com/api/v1/sensores")
            .then((response) => response.data);
    });

    const refetchData = () => {
        setLoading(true);
        refetch();
    };

    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading]);

    return (
        <div className='posicao'>
            <Aside name={state} />
            <MainHeader page={"Histórico de Leitura"} />
            <div className='list'>
            <h1 className={!loading  && !error ? " " :"esconder-titulo"}>Histórico de leituras</h1>
                {error ? <Erro refetchData={refetchData} /> :
                    loading ? <Carregando /> :
                        data ? (
  
                            data.map((todo) => (
                                <>
                                    
                                    <div key={todo.id} className="sensores">
                                        <div className="sensores-valores">
                                            <h1> Sensor de temperatura: <span className="valorSensor">{todo.sensorTemp + " °C"}</span></h1>
                                            <h1> Sensor de umidade: <span className="valorSensor">{todo.sensorUmidade + " %"}</span></h1>
                                            <h1> Sensor de pressão: <span className="valorSensor">{todo.sensorPressao + " hPa"}</span></h1>
                                        </div>
                                        <div>
                                            <h1 id="bold" > data de salvamento: {formatar_data(todo.dataCriacao)}</h1>
                                        </div>
                                    </div>

                                </>

                            ))
                        ) : (
                            <div>Carregando dados...</div>
                        )
                }
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

export default List;