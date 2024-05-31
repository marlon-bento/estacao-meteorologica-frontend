import { Chart } from "react-google-charts";
import moment from "moment";
export default function GraficoPizza({data, intervalo}){
    const filtrarDados = () => {
        let filteredData = [];

        switch (intervalo) {
            case "todo":
                data.forEach(item => {
                    let dia = new Date(item.dataCriacao).getDate();
                    filteredData.push({sensorUmidade: item.sensorUmidade, sensorTemp: item.sensorTemp, sensorPressao: item.sensorPressao});
                });
                break;
            case "ano":
                // Obter o mês e o ano atual
                const dataAnual = new Date();
                let ano = moment(dataAnual).format("YYYY")


                data.forEach(item => {
                    let anoReferencia = moment(item.dataCriacao).format("YYYY")

                    if (ano === anoReferencia) {
                        filteredData.push({sensorUmidade: item.sensorUmidade, sensorTemp: item.sensorTemp, sensorPressao: item.sensorPressao});
                    }


                });
                break;
            case "mes":
                // Obter o mês e o ano atual
                const dataAtual = new Date();
                let mesAtual = moment(dataAtual).format("MM/YYYY")


                data.forEach(item => {
                    let mesDado = moment(item.dataCriacao).format("MM/YYYY")

                    if (mesAtual === mesDado) {
                        filteredData.push({sensorUmidade: item.sensorUmidade, sensorTemp: item.sensorTemp, sensorPressao: item.sensorPressao});
                    }


                });
                break;
            default:
                break;
        }

        return filteredData;
    };
    const optionsPizza = {
        title: "TEMPERATURA X UMIDADE X PRESSÃO",
    }
    let dadosFiltrados = filtrarDados()
    let totalMedicaoUmidade = 0, totalMedicaoTemperatura = 0,totalMedicaoPressao = 0;
    for(let i=0;i<dadosFiltrados.length;i++){
        console.log(dadosFiltrados[i])
        totalMedicaoTemperatura += (dadosFiltrados[i].sensorTemp);
        totalMedicaoUmidade += (dadosFiltrados[i].sensorUmidade)
        totalMedicaoPressao += (dadosFiltrados[i].sensorPressao)
       
    }
    const dataPizza = [
        ["Sensor","Medição"],
        ["Temperatura",(totalMedicaoTemperatura/dadosFiltrados.length)],
        ["Umidade", (totalMedicaoUmidade/dadosFiltrados.length)],
        ["Pressão", (totalMedicaoPressao/dadosFiltrados.length)]
    ];
    console.log(dataPizza);
    return(
        
            <Chart
                        chartType="PieChart"
                        data={dataPizza}
                        options={optionsPizza}
                        width={"100%"}
                        height={"400px"}
                        className="grid-item"
                    />
    
    );
}