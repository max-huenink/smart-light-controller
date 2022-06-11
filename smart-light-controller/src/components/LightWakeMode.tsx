import { useState, useEffect, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { Sun } from 'react-bootstrap-icons';
import WakeModeTrait from '../models/traits/WakeModeTrait';

export default function LightWakeMode({ WakeModeOn }: WakeModeTrait) {
  const [on, setOn] = useState<boolean>(WakeModeOn);

  const toggle = useCallback(() => {
    setOn(o => !o);
    console.log('wake mode toggled');
  }, []);

  return (<>
    <Button variant={on ? 'success' : 'danger'} onClick={toggle}>
      <Sun />
    </Button>
    {on ? "On" : "Off"}
  </>);
}