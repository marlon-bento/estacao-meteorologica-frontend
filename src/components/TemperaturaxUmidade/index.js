import React from "react";
import { Chart } from "react-google-charts";
import moment from 'moment';

export default function TemperaturaxUmidade({ dados, intervalo }) {


    // Função para filtrar os dados com base no intervalo selecionado
    const filtrarDados = () => {
        let filteredData;

        switch (intervalo) {
            case "todo":
                filteredData = [["Todos dados", "Umidade", "Temperatura"]]
                dados.forEach(item => {
                    let dia = new Date(item.dataCriacao).getDate();
                    filteredData.push(["Data " + moment(item.dataCriacao).format("DD/MM/YYYY"), item.sensorUmidade, item.sensorTemp]);
                });
                break;
            case "ano":
                filteredData = [["Ano atual", "Umidade", "Temperatura"]]
                // Obter o mês e o ano atual
                const dataAnual = new Date();
                let ano = moment(dataAnual).format("YYYY")


                dados.forEach(item => {
                    let anoReferencia = moment(item.dataCriacao).format("YYYY")

                    if (ano === anoReferencia) {
                        filteredData.push(["Dia " + moment(item.dataCriacao).format("DD"), item.sensorUmidade, item.sensorTemp]);
                    }


                });
                break;
            case "mes":
                filteredData = [["Mês atual", "Umidade", "Temperatura"]]
                // Obter o mês e o ano atual
                const dataAtual = new Date();
                let mesAtual = moment(dataAtual).format("MM/YYYY")


                dados.forEach(item => {
                    let mesDado = moment(item.dataCriacao).format("MM/YYYY")

                    if (mesAtual === mesDado) {
                        filteredData.push(["Dia " + moment(item.dataCriacao).format("DD"), item.sensorUmidade, item.sensorTemp]);
                    }


                });
                break;
            default:
                break;
        }

        return filteredData;
    };

    // Opções para o gráfico
    const options = {
        title: "Temperatura x Umidade",

    };

    return (





        <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={filtrarDados()}
            options={options}


        />


    );
}