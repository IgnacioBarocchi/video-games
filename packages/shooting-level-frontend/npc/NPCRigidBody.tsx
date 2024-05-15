import { forwardRef, useContext } from "react";
import {
  CapsuleCollider,
  CylinderCollider,
  RigidBody,
} from "@react-three/rapier";
import { Context } from "../providers/player-context-provider";

export const NPCRigidBody = forwardRef(
  ({ children, position, onCollisionEnter, actor }, NPCRigidBodyReference) => {
    return (
      <RigidBody
        lockRotations={true}
        colliders={false}
        ref={NPCRigidBodyReference}
        name={"NPC"}
        position={position}
        userData={actor}
      >
        <CapsuleCollider
          args={[0.6, 0.2]}
          position={[0, 0.8, 0]}
          onCollisionEnter={onCollisionEnter}
        />
        <CylinderCollider args={[0.2, 2]} position={[0, 0.5, 0]} sensor />
        {children}
      </RigidBody>
    );
  }
);
