import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import Aside from "../../components/Aside";
import MainHeader from "../../components/MainHeader";
import "./style.css";
import Mqtt from "../../components/Mqtt";
import GraficoPizza from "../../components/GraficoPizza";
import TemperaturaxUmidade from "../../components/TemperaturaxUmidade";

function Dashboard() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showCharts, setShowCharts] = useState(true); // Estado para controlar a visibilidade dos gráficos
    const { state } = useLocation();
    const [intervalo, setIntervalo] = useState("todo"); // Definindo a variável intervalo e a função setIntervalo

    const { data, isLoading, error } = useQuery("todos", () => {
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

    if (isLoading) {
        return <div className="loading">carregando...</div>;
    }
    if (error) {
        return (
            <>
                <h1 className="erroHistorico">Histórico não encontrado</h1>
            </>
        );
    }

    return (
        <div className="posicao">
            <Aside />
            <MainHeader page={"Dashboard"} />
            <div className="dashboard">
                <Mqtt />
                <div className="controls">
                    
                    <span className="filtrar-por">Filtar por: </span>
                    
                        <select
                            value={intervalo}
                            onChange={(e) => setIntervalo(e.target.value)}
                        >
                            <option value="todo">Todo o histórico</option>
                            <option value="este">Este Mês</option>
                        </select>
                   
                  
                </div>
                <div className="primeira-linha-graficos">

                    <div className="grid-item" >
                        {showCharts && (
                            <TemperaturaxUmidade dados={data} intervalo={intervalo} />
                        )}
                    </div>
                    <div className="grid-item" >
                        {showCharts && <GraficoPizza data={data} />}
                    </div>
                </div>
                
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
