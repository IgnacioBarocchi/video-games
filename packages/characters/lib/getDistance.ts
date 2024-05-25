import { Vector3 } from 'three';

export const getDistance = (params: {
  sourcePosition: Vector3;
  targetPosition: Vector3;
}) => {
  const { sourcePosition, targetPosition } = params;
  return Math.sqrt(
    Math.pow(targetPosition.x - sourcePosition.x, 2) +
      Math.pow(targetPosition.z - sourcePosition.z, 2),
  );
};
