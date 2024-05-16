import { forwardRef } from "react";
import {
  CapsuleCollider,
  CylinderCollider,
  RigidBody,
} from "@react-three/rapier";

export const CharacterRigidBody = forwardRef(
  ({ children, name, position, userData }, rigidBodyReference) => {
    return (
      <RigidBody
        name={
          // typeof ENTITY
          name
        }
        lockRotations={true}
        colliders={false}
        ref={rigidBodyReference}
        position={position}
        userData={userData}
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
