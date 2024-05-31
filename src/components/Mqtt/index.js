import React, { useEffect, useState } from "react";
import mqtt from "mqtt";
import './style.css';
import axios from "axios";


const Mqtt = () => {
  const [client, setClient] = useState(null);
  const [temperatura, setTemperatura] = useState(null);
  const [umidade, setUmidade] = useState(null);
  const [pressao, setPressao] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar o envio dos dados

  useEffect(() => {
    const connectToMQTT = () => {
      const mqttClient = mqtt.connect("wss://test.mosquitto.org:8081", {
        protocol: "wss"
      });

      mqttClient.on("connect", () => {
        console.log("Connected to MQTT server");
        setClient(mqttClient);

        mqttClient.subscribe("estacao/iot2/2024/sub/temperatura");
        mqttClient.subscribe("estacao/iot2/2024/sub/umidade");
        mqttClient.subscribe("estacao/iot2/2024/sub/pressao");
      });

      mqttClient.on("message", (topic, message) => {
        const payload = message.toString();
        switch (topic) {
          case "estacao/iot2/2024/sub/temperatura":
            setTemperatura(payload);
            break;
          case "estacao/iot2/2024/sub/umidade":
            setUmidade(payload);
            break;
          case "estacao/iot2/2024/sub/pressao":
            setPressao(payload);
            break;
          default:
            break;
        }
      });

      mqttClient.on("error", (error) => {
        console.error("MQTT error:", error);
      });
    };

    connectToMQTT();

    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    if (temperatura === null || umidade === null || pressao === null) {
      alert("Não existe dados para serem salvos!")
      return;
    }

    setIsSubmitting(true); // Marque como enviando

    const cadastroSensor = {
      sensorTemp: temperatura,
      sensorUmidade: umidade,
      sensorPressao: pressao
    };
    console.log(cadastroSensor);

    try {
        const response = await axios.post('https://estacao-meteorologica-backend.onrender.com/api/v1/sensores', cadastroSensor, {
            timeout: 10000 // Tempo limite em milissegundos (10 segundos)
        });
        return alert("Dados enviados");
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        setIsSubmitting(false); // Resetar o estado para permitir novo envio
        if (error.code === 'ECONNABORTED') {
            alert('Tempo limite excedido. O serviço de envio de dados está indisponível no momento. Por favor, tente novamente mais tarde.');
        } else if (error.response && error.response.status === 404) {
            alert('Não foi possível conectar ao serviço de dados. Por favor, tente novamente mais tarde.');
        } else {
            alert('Erro ao enviar dados. Por favor, tente novamente mais tarde.');
        }
    }
};
  // Restante do código...

  return (
    <div className="sensores-container">
      <h1 className="valores-atuais">Valores Atuais:</h1>
      <div className="div-temperatura">
        <p className="titulo-sensor">Temperatura: </p>
        <p className="valor-sensor">{temperatura === null? "?" : temperatura + " °C"}</p>
        
      </div>
      <div className="div-umidade">
        <p className="titulo-sensor" >Umidade: </p>
        <p className="valor-sensor">{umidade === null? "?" : umidade + " %"}</p>
        
      </div>
      <div className="div-pressao">
        <p className="titulo-sensor">Pressão: </p>
        <p className="valor-sensor">{pressao === null? "?" : pressao + " hPa"}</p>
        
      </div>
    <div>
      <button className="titulo-sensor button-save" onClick={handleSave}>Salvar</button>
    </div>  
      
     
    </div>
  );
};

export default Mqtt;