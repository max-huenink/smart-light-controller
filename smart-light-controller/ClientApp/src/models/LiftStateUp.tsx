import React from "react";

export default interface LiftStateUp<T> {
  value: T,
  setValue: React.Dispatch<React.SetStateAction<T>>,
}