import { useMemo, useCallback } from 'react';
import { RgbColorPicker } from 'react-colorful';
import LiftStateUp from '../models/LiftStateUp';
import { RGB } from '../models/traits/ColorTrait';

interface RgbColor {
  r: number,
  g: number,
  b: number,
}
export default function LightColor({ value, setValue }: LiftStateUp<RGB>) {
  const color = useMemo((): RgbColor => ({
    r: value.Red,
    g: value.Green,
    b: value.Blue,
  }), [value]);

  const translateColor = useCallback((color: RgbColor): RGB => ({
    Red: color.r,
    Green: color.g,
    Blue: color.b,
  }), []);

  const setColor = useCallback((color: RgbColor) => {
    setValue(translateColor(color));
  }, [setValue, translateColor])

  return (<div>
    <h3>Color</h3>
    <RgbColorPicker color={color} onChange={setColor} />
  </div>);
}