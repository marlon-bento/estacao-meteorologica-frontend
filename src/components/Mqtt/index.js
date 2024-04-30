import React, { useEffect, useState } from "react";
import mqtt from "mqtt";
import './style.css';

const Mqtt = () => {
  const [client, setClient] = useState(null);
  const [temperatura, setTemperatura] = useState(null);
  const [umidade, setUmidade] = useState(null);
  const [pressao, setPressao] = useState(null);

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
      
      
     
    </div>
  );
};

export default Mqtt;