import React, { useState, useEffect, useCallback } from 'react';
import { Card, } from 'react-bootstrap';
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

export default function SmartLight({ device }: SmartLightProps) {
  const onOff = useCallback(() => {
    return device.Traits.includes(PossibleDeviceTraits.OnOff) ? <LightOnOff On={device.State.On} /> : null
  }, [device]);

  const brightness = useCallback(() => {
    return device.Traits.includes(PossibleDeviceTraits.Brightness) ? <LightBrightness Brightness={device.State.Brightness} /> : null
  }, [device]);

  const color = useCallback(() => {
    return device.Traits.includes(PossibleDeviceTraits.Color) ? <LightColor Color={device.State.Color} /> : null
  }, [device]);

  const wakeMode = useCallback(() => {
    return device.Traits.includes(PossibleDeviceTraits.WakeMode) ? <LightWakeMode WakeModeOn={device.State.WakeModeOn} /> : null
  }, [device]);

  return <Card className="text-center">
    <Card.Body>
      <Card.Title>{device.Name}</Card.Title>
      {onOff()}
      {brightness()}
      {color()}
      {wakeMode()}
    </Card.Body>
  </Card>;
}