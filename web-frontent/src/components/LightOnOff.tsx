import Button from 'react-bootstrap/Button';
import { Power } from 'react-bootstrap-icons';
import ToggleState from '../models/ToggleState';

export default function LightOnOff({ value, toggle }: ToggleState) {
  return (<>
    <h3>
      {value ? "On" : "Off"}
    </h3>
    <Button variant={value ? 'success' : 'danger'} onClick={toggle}>
      <Power />
    </Button>
  </>);
}