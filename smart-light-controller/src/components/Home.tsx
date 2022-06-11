import React, { useState, useEffect, useCallback } from 'react';
import mqtt, { MqttClient } from 'mqtt';
// import 'dotenv';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DeviceModel from '../models/DeviceModel';
import SmartLight from './SmartLight';
import DeviceConfig from '../models/DeviceConfig';
import PossibleDeviceTraits from '../models/PossibleDeviceTraits';

export default function Home() {
  const [client, setClient] = useState<MqttClient>();
  const [deviceStates, setDeviceStates] = useState<{ [deviceName: string]: React.ReactElement }>({});

  const publishDeviceConfig = useCallback((deviceName: string, config: DeviceConfig) => {
    if (client && client?.connected) {
      client.publish(`smartLights/${deviceName}/config`, JSON.stringify(config));
    }
  }, [client]);

  // Setup client, connect to broker
  useEffect(() => {
    // setClient(mqtt.connect(process.env.BROKER_URL ?? '', {
    //   properties: {
    //     authenticationMethod: 'psk',
    //     authenticationData: Buffer.from(process.env.PSK ?? '', 'utf-8'),
    //   },
    // }));
  }, [publishDeviceConfig]);

  const addDevice = useCallback((device: DeviceModel) => {
    setDeviceStates(d => {
      const temp = { ...d };
      temp[device.Name] = <SmartLight device={device} configCallback={publishDeviceConfig} />;
      return temp;
    })
  }, []);

  useEffect(() => {
    const device: DeviceModel = {
      Name: 'Test Device One',
      State: {
        Brightness: 100,
        Color: {
          red: 255,
          green: 100,
          blue: 200,
        },
        On: true,
        WakeModeOn: false
      },
      Traits: [PossibleDeviceTraits.Brightness, PossibleDeviceTraits.Color, PossibleDeviceTraits.OnOff, PossibleDeviceTraits.WakeMode]
    }
    addDevice(device);
  }, [addDevice]);
  useEffect(() => {
    const device: DeviceModel = {
      Name: 'Test Device Two',
      State: {
        Brightness: 200,
        Color: {
          red: 255,
          green: 100,
          blue: 200,
        },
        On: false,
        WakeModeOn: false
      },
      Traits: [PossibleDeviceTraits.Brightness, PossibleDeviceTraits.Color, PossibleDeviceTraits.OnOff]
    }
    addDevice(device);
  }, [addDevice]);

  // Client connected; subscribe to topics, and publish to ping topic
  useEffect(() => {
    if (client && client.connected) {
      client.subscribe('smartLights/+/state');

      client.on('message', (topic, msgBuf) => {
        // Dispact to callback
        if (topic.match(/smartLights\/\w*\/state/)) {
          const msg = msgBuf.toString();
          const device: DeviceModel = JSON.parse(msg);
          setDeviceStates(d => {
            const temp = { ...d };
            temp[device.Name] = <SmartLight device={device} configCallback={publishDeviceConfig} />;
            return temp;
          })
        }
      })

      client.publish('smartLights/+/ping', JSON.stringify({
        getState: true,
        getTraits: true,
      }));
    }
  }, [client, publishDeviceConfig]);

  return <>
    <Row xs={1} md={2} lg={2} className="g-4">
      {Object.keys(deviceStates).map(k => <Col key={k}>{deviceStates[k]}</Col>)}
    </Row>
  </>;
}