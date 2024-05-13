import { forwardRef } from "react";
import {
  CapsuleCollider,
  CylinderCollider,
  RigidBody,
} from "@react-three/rapier";
import { MaleCharacter3DModel } from "./MaleCharacter3DModel";

export const CharacterRigidBody = forwardRef(
  ({ children, position }, playerRigidBodyReference) => {
    return (
      <RigidBody
        lockRotations={true}
        colliders={false}
        ref={playerRigidBodyReference}
        name={"Player"}
        position={position}
        //   userData={userData.current}
        //   position={position}
      >
        <CapsuleCollider
          args={[0.2, 0.6]}
          position={[0, 0.8, 0.2]}
          // onCollisionEnter={onCollisionEnter}
        />
        <CylinderCollider args={[0.2, 2]} position={[0, 0.5, 0]} sensor />
        {children}
      </RigidBody>
    );
  }
);

{
  /* <Suspense fallback={null}>
        <Model
          machine={[
            // @ts-ignore // Todo type this
            state,
            send,
          ]}
        />
      </Suspense> */
}
