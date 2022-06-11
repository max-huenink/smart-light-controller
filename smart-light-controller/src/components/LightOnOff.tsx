import { useState, useEffect, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { Power } from 'react-bootstrap-icons';
import OnOffTrait from '../models/traits/OnOffTrait';

export default function LightOnOff({ On }: OnOffTrait) {
  const [on, setOn] = useState<boolean>(On);

  const toggle = useCallback(() => {
    setOn(o => !o);
    console.log('on off toggled');
  }, []);

  return (<>
    <Button variant={on ? 'success' : 'danger'} onClick={toggle}>
      <Power />
    </Button>
    {on ? "On" : "Off"}
  </>);
}