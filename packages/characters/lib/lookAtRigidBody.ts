import { Quaternion, Vector3 } from 'three';
import { getVector3From } from './getVector3From';
import { RapierRigidBody } from '@react-three/rapier';

export const lookAtRigidBody = (
  targetPosition: Vector3,
  sourceRigidBody: RapierRigidBody,
) => {
  const rigidBodyPosition = sourceRigidBody.translation();

  const direction = new Vector3()
    .subVectors(targetPosition, getVector3From(rigidBodyPosition))
    .normalize();

  const rotation = new Quaternion();
  rotation.setFromUnitVectors(new Vector3(0, 0, 1), direction);
  rotation.set(0, rotation.y, 0, rotation.w);
  sourceRigidBody.setRotation(rotation, false);
};
