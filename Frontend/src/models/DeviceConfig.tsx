import ColorTrait from "./traits/ColorTrait";

type DeviceConfig = {
  LightOn: boolean,
  Color: ColorTrait,
  Brightness: number,
  WakeMode: boolean,
};
export default DeviceConfig;