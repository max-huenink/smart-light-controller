import { useState, useEffect, useCallback } from 'react';
import { HttpTransportType, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { Button } from 'react-bootstrap';

type Forecast = {
  date: string,
  temperatureC: number,
  temperatureF: number,
  summary?: string,
  id: number,
}

export default function Hub() {
  const [connection, setConnection] = useState<signalR.HubConnection>();

  useEffect(() => {
    setConnection(new HubConnectionBuilder()
      .withUrl(`/hub/test`, {
        //logger: LogLevel.Trace,
        //logMessageContent: true,
        //transport: HttpTransportType.WebSockets,
        //skipNegotiation: true,
      })
      .withAutomaticReconnect()
      .build()
    );
  }, []);

  useEffect(() => {
    if (connection) {
      console.log("Starting");
      connection.start()
        .then(() => {
          console.log("Connected!");
          connection.on("messageReceived", (username: string, message: string) => {
            console.log(`Received message from ${username}: ${message}`);
          })
        })
        .catch(ex => {
          console.log(`Exception caught when trying to start connection: ${ex}`);
        })
      return () => {
        console.log("Disconnecting...");
        connection.stop();
      }
    }
  }, [connection])

  const send = useCallback(() => {
    if (connection) {
      connection.send("NewMessage", 112345, "test message!");
    }
  }, [connection]);

  const [forecast, setForecast] = useState<Forecast[]>([]);
  const getWeather = useCallback(() => {
    if (connection) {
      connection.invoke<Forecast[]>("Get").then(r => setForecast(r))
    }
  }, [connection])

  return (<>
    <Button onClick={send}>Send!</Button>
    <Button onClick={getWeather}>Get weather!</Button>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Temp C</th>
          <th>Temp F</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        {forecast.map(f => {
          return (
            <tr key={f.id}>
              <td>{new Date(Date.parse(f.date)).toDateString()}</td>
              <td>{f.temperatureC}</td>
              <td>{f.temperatureF}</td>
              <td>{f.summary}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </>);
}