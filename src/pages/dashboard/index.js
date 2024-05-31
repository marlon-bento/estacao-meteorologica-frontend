import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

import Aside from "../../components/Aside";
import MainHeader from "../../components/MainHeader";
import "./style.css";
import Mqtt from "../../components/Mqtt";
import GraficoPizza from "../../components/GraficoPizza";
import TemperaturaxUmidade from "../../components/TemperaturaxUmidade";
import GraficoPressao from "../../components/GraficoPressao";

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
function Dashboard() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showCharts, setShowCharts] = useState(true); // Estado para controlar a visibilidade dos gráficos

    const [intervalo, setIntervalo] = useState("todo"); // Definindo a variável intervalo e a função setIntervalo
    const [loading, setLoading] = useState(true);
    const { data, isLoading, error, refetch } = useQuery("todos", () => {
        return axios
            .get(
                "https://estacao-meteorologica-backend.onrender.com/api/v1/sensores"
            )
            .then((response) => response.data);
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setShowCharts(false); // Oculta os gráficos ao redimensionar a janela
            setTimeout(() => setShowCharts(true), 500); // Mostra os gráficos após 500ms
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const refetchData = () => {
        setLoading(true);
        refetch();
    };

    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading]);


    return (
        <div className="posicao">
            <Aside />
            <MainHeader page={"Dashboard"} />
            <div className="dashboard">
                {
                    error ? <Erro refetchData={refetchData} />
                        :
                        loading ? <Carregando />
                            :

                            (
                                <>
                                    <Mqtt />
                                    <div className="controls">

                                        <span className="filtrar-por">Filtar por: </span>

                                        <select
                                            value={intervalo}
                                            onChange={(e) => setIntervalo(e.target.value)}
                                        >
                                            <option value="todo">Todo o histórico</option>
                                            <option value="ano">Anual</option>
                                            <option value="mes">Mensal</option>
                                        </select>


                                    </div>
                                    <div className="primeira-linha-graficos">

                                        <div className="grid-item" >
                                            {showCharts && (
                                                <TemperaturaxUmidade dados={data} intervalo={intervalo} />
                                            )}
                                        </div>
                                        <div className="grid-item" >
                                            {showCharts && <GraficoPizza data={data} intervalo={intervalo} />}
                                        </div>
                                    </div>
                                    <div className="primeira-linha-graficos">

                                        <div className="grid-item" >
                                            {showCharts && (
                                                <GraficoPressao dadosSensores={data} intervalo={intervalo}/>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )
                }


            </div>
        </div>
    );
}

function formatar_data(datestring) {
    const newDate = new Date(datestring);
    const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "America/Sao_Paulo",
    };
    return newDate.toLocaleString("pt-BR", options);
}

export default Dashboard;
