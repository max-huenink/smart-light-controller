import React from "react";

export default interface ToggleState {
  value: boolean,
  toggle: () => void,
}