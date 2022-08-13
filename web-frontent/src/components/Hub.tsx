import { useState, useEffect, useCallback } from 'react';
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Button } from 'react-bootstrap';

export default function Hub() {
  const [connection, setConnection] = useState<signalR.HubConnection>();
  useEffect(() => {
    setConnection(new HubConnectionBuilder()
      .withUrl("/api/weatherforecast")
      .build()
    );
  }, []);
  useEffect(() => {
    if (connection?.connectionId) {
      connection.on("messageReceived", (username: string, message: string) => {
        console.log(`Received message from ${username}: ${message}`);
      })
    }
  }, [connection])
  const send = useCallback(() => {
    if (connection?.connectionId) {
      connection.send("newMessage", "max", "test message!");
    }
  }, [connection]);
  return (<>
    <Button onClick={send}>Send!</Button>
  </>);
}