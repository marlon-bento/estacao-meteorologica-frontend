import { Chart } from "react-google-charts";
import moment from "moment";
export default function GraficoPressao({ dadosSensores, intervalo }) {
    const filtrarDados = () => {
        let filteredData = [];

        switch (intervalo) {
            case "todo":
                dadosSensores.forEach(item => {
                    let dia = new Date(item.dataCriacao).getDate();
                    filteredData.push({sensorPressao: item.sensorPressao });
                });
                break;
            case "ano":
                // Obter o mês e o ano atual
                const dataAnual = new Date();
                let ano = moment(dataAnual).format("YYYY")


                dadosSensores.forEach(item => {
                    let anoReferencia = moment(item.dataCriacao).format("YYYY")

                    if (ano === anoReferencia) {
                        filteredData.push({sensorPressao: item.sensorPressao });
                    }


                });
                break;
            case "mes":
                // Obter o mês e o ano atual
                const dataAtual = new Date();
                let mesAtual = moment(dataAtual).format("MM/YYYY")


                dadosSensores.forEach(item => {
                    let mesDado = moment(item.dataCriacao).format("MM/YYYY")

                    if (mesAtual === mesDado) {
                        filteredData.push({sensorPressao: item.sensorPressao});
                    }


                });
                break;
            default:
                break;
        }

        return filteredData;
    };
    let data = []
    data.push([
        "Dia",
        "Pressão"
    ])
    let dadosFiltrados = filtrarDados();
    for (let i = 0; i < dadosFiltrados.length; i++) {
        let dadoVetor;
        dadoVetor = [moment(dadosFiltrados[i].dataCriacao).format("DD"), dadosFiltrados[i].sensorPressao];
        data.push(dadoVetor);
    }
    const options = {
        chart: {
            title: "Grafico Pressão"
        },
    };


    return (
        <Chart
            chartType="Line"
            width="100%"
            height="400px"
            data={data}
            options={options}
        />
    );
}