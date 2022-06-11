import { Button } from 'react-bootstrap';
import { Sun } from 'react-bootstrap-icons';
import ToggleState from '../models/ToggleState';

export default function LightWakeMode({ value, toggle }: ToggleState) {
  return (<>
    <h3>
      Wake Mode {value ? "On" : "Off"}
    </h3>
    <Button variant={value ? 'success' : 'danger'} onClick={toggle}>
      <Sun />
    </Button>
  </>);
}