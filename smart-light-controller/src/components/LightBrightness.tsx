import { useState, useEffect, useCallback } from 'react';
import BrightnessTrait from '../models/traits/BrightnessTrait';

export default function LightBrightness({ Brightness }: BrightnessTrait) {
  const [brightness, setBrightness] = useState<number>(Brightness);

  // TODO look into debounce instead
  const handle = useCallback(() => {
    console.log(`new brightness ${brightness}`)
  }, [brightness]);

  return (<div>
    <input type='range' min={0} max={255} value={brightness}
      onChange={e => setBrightness(parseInt(e.target.value))}
      onMouseUp={handle}
      onPointerUp={handle} />
  </div>);
}