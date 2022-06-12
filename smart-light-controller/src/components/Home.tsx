import React, { useState, useEffect, useCallback } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DeviceModel from '../models/DeviceModel';
import SmartLight from './SmartLight';
import DeviceConfig from '../models/DeviceConfig';
import { Buffer } from 'buffer';

export default function Home() {
  const [deviceStates, setDeviceStates] = useState<{ [deviceName: string]: React.ReactElement }>({});

  const publishDeviceConfig = useCallback((deviceName: string, config: DeviceConfig) => {
    //   if (client && client?.connected) {
    //     client.publish(`smartLights/${deviceName}/config`, JSON.stringify(config));
    //   }
    // }, [client]);
  }, []);

  // Setup client, connect to broker
  useEffect(() => {
  }, [publishDeviceConfig]);

  // only needed for testing
  /*
  const addDevice = useCallback((device: DeviceModel) => {
    setDeviceStates(d => {
      const temp = { ...d };
      temp[device.Name] = <SmartLight device={device} configCallback={publishDeviceConfig} />;
      return temp;
    })
  }, [publishDeviceConfig]);

  useEffect(() => {
    const device: DeviceModel = {
      Name: 'Test Device One',
      State: {
        Brightness: 100,
        Color: {
          r: 255,
          g: 100,
          b: 200,
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
          r: 255,
          g: 100,
          b: 200,
        },
        On: false,
        WakeModeOn: false
      },
      Traits: [PossibleDeviceTraits.Brightness, PossibleDeviceTraits.Color, PossibleDeviceTraits.OnOff]
    }
    addDevice(device);
  }, [addDevice]);
  */

  // Client connected; subscribe to topics, and publish to ping topic
  useEffect(() => {
    // if (client && client.connected) {
    //   console.log('connected!')
    //   client.subscribe('smartLights/+/state');

    //   client.on('message', (topic, msgBuf) => {
    //     const msg = msgBuf.toString();
    //     console.log(`received message from ${topic}: ${msg}`)
    //     // Dispact to callback
    //     if (topic.match(/smartLights\/[^/]*\/state/)) {
    //       const device: DeviceModel = JSON.parse(msg);
    //       setDeviceStates(d => {
    //         const temp = { ...d };
    //         temp[device.Name] = <SmartLight device={device} configCallback={publishDeviceConfig} />;
    //         return temp;
    //       })
    //     }
    //   })

    // const lights = process.env.REACT_APP_LIGHTS?.split(',');
    // lights?.forEach(light => {
    // client.publish(`smartLights/${light}/ping`, JSON.stringify({
    //   getState: true,
    //   getTraits: true,
    // }));
    // })
    // }
    // }, [client, publishDeviceConfig]);
  }, [publishDeviceConfig]);

  return <>
    <Row xs={1} md={2} lg={2} className="g-4">
      {Object.keys(deviceStates).map(k => <Col key={k}>{deviceStates[k]}</Col>)}
    </Row>
  </>;
}