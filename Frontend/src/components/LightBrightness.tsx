import * as React from 'react';
import LiftStateUp from '../models/LiftStateUp';

export default function LightBrightness({ value, setValue }: LiftStateUp<number>) {
  return (<div>
    <input type='range' min={0} max={255} value={value} onChange={e => setValue(parseInt(e.target.value))} />
  </div>);
}