import { Quaternion, Vector3 } from "three";
import {
  CollisionPayload,
  IntersectionEnterPayload,
  IntersectionExitPayload,
  RapierRigidBody,
} from "@react-three/rapier";
import { Vector } from "@dimforge/rapier3d-compat";
import { ENTITY } from "../constants";

export const getImpulseVectorTowards = (params: {
  sourcePosition: Vector3;
  targetPosition: Vector3;
  speed: number;
}): Vector3 => {
  const { sourcePosition, targetPosition, speed } = params;
  const direction = new Vector3();
  direction.subVectors(targetPosition, sourcePosition).normalize();
  const impulse = new Vector3(direction.x, 0, direction.z).multiplyScalar(
    speed
  );
  return impulse;
};

export const getVector3From = (vector: Vector) => {
  return new Vector3(vector.x, vector.y, vector.z);
};

export const lookAtRigidBody = (
  targetPosition: Vector3,
  sourceRigidBody: RapierRigidBody
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

export const linvelTowards = (params: {
  sourceRigidBody: RapierRigidBody;
  sourcePosition: Vector3;
  targetPosition: Vector3;
  speed: number;
}) => {
  const { sourceRigidBody, sourcePosition, targetPosition } = params;

  const direction = targetPosition.clone().sub(sourcePosition).normalize();
  const linearVelocity = direction.multiplyScalar(5);
  linearVelocity.multiplyScalar(2);

  sourceRigidBody.setLinvel(linearVelocity, false);
};

export const goToTarget = (params: {
  sourcePosition: Vector3;
  targetPosition: Vector3;
  speed: number;
  sourceRigidBody: RapierRigidBody;
  style: "LINEAR VELOCITY" | "IMPULSE";
}) => {
  const { sourcePosition, targetPosition, sourceRigidBody, speed, style } =
    params;

  lookAtRigidBody(targetPosition, sourceRigidBody);

  if (style === "IMPULSE") {
    const impulse = getImpulseVectorTowards({
      targetPosition,
      sourcePosition,
      speed,
    });

    sourceRigidBody.applyImpulseAtPoint(impulse, targetPosition, true);
  } else {
    linvelTowards({
      sourceRigidBody,
      sourcePosition,
      targetPosition,
      speed,
    });
  }
};

export const payloadIsEntity = (
  payload:
    | CollisionPayload
    | IntersectionEnterPayload
    | IntersectionExitPayload,
  entity: string
) => payload?.other?.rigidBodyObject?.name === entity;

export const payloadIsThePlayer = (payload: CollisionPayload) =>
  payloadIsEntity(payload, ENTITY.CAR);
