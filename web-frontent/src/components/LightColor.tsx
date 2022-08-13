import { RgbColorPicker } from 'react-colorful';
import LiftStateUp from '../models/LiftStateUp';
import ColorTrait from '../models/traits/ColorTrait';

export default function LightColor({ value, setValue }: LiftStateUp<ColorTrait>) {
  return (<div>
    <h3>Color</h3>
    <RgbColorPicker color={value} onChange={setValue} />
  </div>);
}