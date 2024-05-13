import { Vector3 } from "three";
import { RapierRigidBody } from "@react-three/rapier";
import { lookAtRigidBody } from "./lookAtRigidBody";
import { getImpulseVectorTowards } from "./getImpulseVectorTowards";

const linvelTowards = (params: {
  sourceRigidBody: RapierRigidBody;
  sourcePosition: Vector3;
  targetPosition: Vector3;
  speed: number;
}) => {
  const { sourceRigidBody, sourcePosition, targetPosition } = params;

  const direction = targetPosition.clone().sub(sourcePosition).normalize();
  const linearVelocity = direction.multiplyScalar(1);
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
