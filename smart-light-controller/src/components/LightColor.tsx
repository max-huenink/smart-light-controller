import { useState, useEffect, useCallback } from 'react';
import { RgbColorPicker } from 'react-colorful';
import ColorTrait from '../models/traits/ColorTrait';

export default function LightColor({ Color }: ColorTrait) {
  const [color, setColor] = useState({ r: Color.red, g: Color.green, b: Color.blue });

  // TODO look into debounce instead
  const handle = useCallback(() => {
    console.log('new color is');
    console.log(color)
  }, [color])

  return (<div>
    <RgbColorPicker color={color} onChange={setColor} onPointerUp={handle} />
  </div>);
}