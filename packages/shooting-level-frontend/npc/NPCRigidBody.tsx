import { forwardRef, useContext } from "react";
import {
  CapsuleCollider,
  CylinderCollider,
  RigidBody,
} from "@react-three/rapier";
import { Context } from "../providers/player-context-provider";

export const NPCRigidBody = forwardRef(
  ({ children, position, FSM, onCollisionEnter }, NPCRigidBodyReference) => {
    const playerActor = useContext(Context);
    return (
      <RigidBody
        lockRotations={true}
        colliders={false}
        ref={NPCRigidBodyReference}
        name={"Player"}
        position={position}
        // userData={FSM}
      >
        <CapsuleCollider
          args={[0.2, 0.6]}
          position={[0, 0.8, 0.2]}
          onCollisionEnter={onCollisionEnter}
        />
        <CylinderCollider args={[0.2, 2]} position={[0, 0.5, 0]} sensor />
        {children}
      </RigidBody>
    );
  }
);
