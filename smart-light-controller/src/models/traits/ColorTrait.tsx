import Trait from "./Trait";

export default interface ColorTrait extends Trait {
  Color: { red: number, green: number, blue: number }
}