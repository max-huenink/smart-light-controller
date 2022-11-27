import React, { useState, useEffect, useMemo } from 'react';
import Card from 'react-bootstrap/Card';
import debounce from 'lodash.debounce';
import DeviceModel from '../models/DeviceModel';
import DeviceConfig from '../models/DeviceConfig';
import PossibleDeviceTraits from '../models/PossibleDeviceTraits';
import LightBrightness from './LightBrightness';
import LightColor from './LightColor';
import LightOnOff from './LightOnOff';
import LightWakeMode from './LightWakeMode';

interface SmartLightProps {
  device: DeviceModel,
  configCallback: (deviceName: string, config: DeviceConfig) => void,
}

export default function SmartLight({ device, configCallback }: SmartLightProps) {
  const [on, setOn] = useState(device.State.LightOn);
  const [brightness, setBrightness] = useState(device.State.Brightness);
  const [color, setColor] = useState(device.State.Color);
  const [wakeMode, setWakeMode] = useState(device.State.WakeModeOn);

  const deviceName = useMemo(() => device.Name, [device.Name]);

  const debounceConfig = useMemo(() => debounce((name: string, config: DeviceConfig) => {
    configCallback(name, config);
  }, 1000), [configCallback])

  useEffect(() => {
    const config: DeviceConfig = {
      LightOn: on,
      Brightness: brightness,
      Color: color,
      WakeModeOn: wakeMode,
    };
    debounceConfig(deviceName, config);
  }, [on, brightness, color, wakeMode, deviceName, debounceConfig])


  const onOffComponent = useMemo(() => {
    return device.Traits.includes(PossibleDeviceTraits.OnOff) ? <LightOnOff value={on} toggle={() => setOn(o => !o)} /> : null
  }, [device, on]);

  const brightnessComponent = useMemo(() => {
    return device.Traits.includes(PossibleDeviceTraits.Brightness) ? <LightBrightness value={brightness} setValue={setBrightness} /> : null
  }, [device, brightness]);

  const colorComponent = useMemo(() => {
    return device.Traits.includes(PossibleDeviceTraits.Color) ? <LightColor value={color} setValue={setColor} /> : null
  }, [device, color]);

  const wakeModeComponent = useMemo(() => {
    return device.Traits.includes(PossibleDeviceTraits.WakeMode) ? <LightWakeMode value={wakeMode} toggle={() => setWakeMode(w => !w)} /> : null
  }, [device, wakeMode]);

  return <Card className="text-center">
    <Card.Body>
      <Card.Title as='h2'>{device.Name}</Card.Title>
      {onOffComponent}
      {brightnessComponent}
      {colorComponent}
      {wakeModeComponent}
    </Card.Body>
  </Card>;
}