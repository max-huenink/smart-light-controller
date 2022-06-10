import PossibleDeviceTraits from "./PossibleDeviceTraits";
import DeviceState from "./DeviceState";

type DeviceModel = {
  Name: string;
  Traits: Array<PossibleDeviceTraits>;
  State: DeviceState;
}
export default DeviceModel;