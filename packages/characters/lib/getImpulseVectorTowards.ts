import { Vector3 } from 'three';

export const getImpulseVectorTowards = (params: {
  sourcePosition: Vector3;
  targetPosition: Vector3;
  speed: number;
}): Vector3 => {
  const { sourcePosition, targetPosition, speed } = params;
  const direction = new Vector3();
  direction.subVectors(targetPosition, sourcePosition).normalize();
  const impulse = new Vector3(direction.x, 0, direction.z).multiplyScalar(
    speed,
  );
  return impulse;
};
