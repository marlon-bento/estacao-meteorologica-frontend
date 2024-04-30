import { Chart } from "react-google-charts";
export default function GraficoPizza({data}){

    console.log(data)

    const optionsPizza = {
        title: "TEMPERATURA X UMIDADE",
    }

    let totalMedicaoUmidade = 0, totalMedicaoTemperatura = 0,totalMedicaoPressao = 0;
    for(let i=0;i<data.length;i++){
        totalMedicaoTemperatura+= data[i].sensorTemp;
        totalMedicaoUmidade+= data[i].sensorUmidade
        totalMedicaoPressao+= data[i].sensorPressao
       
    }
    const dataPizza = [
        ["Sensor","Medição"],
        ["Temperatura",totalMedicaoTemperatura],
        ["Umidade", totalMedicaoUmidade],
        ["Pressão", totalMedicaoPressao]
    ];
    
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