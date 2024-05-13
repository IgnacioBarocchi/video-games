import { Vector3 } from "three";

interface Vector {
  x: number;
  y: number;
  z: number;
}

export const getVector3From = (vector: Vector) => {
  return new Vector3(vector.x, vector.y, vector.z);
};
