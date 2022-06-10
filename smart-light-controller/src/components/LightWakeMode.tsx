import { useState, useEffect, useCallback } from 'react';
import WakeModeTrait from '../models/traits/WakeModeTrait';

export default function LightWakeMode({ WakeModeOn }: WakeModeTrait) {
  return (<div>
    <h1>This is wake mode!</h1>
  </div>);
}