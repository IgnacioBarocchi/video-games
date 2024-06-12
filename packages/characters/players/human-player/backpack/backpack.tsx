import { useState } from "react";
import { RigidBody } from "@react-three/rapier";
import { Backpack3DModel } from "./backpack-3D-model";
import { ENTITY } from "game-constants";

export const Backpack = ({ position, setPlayerPickedBackpack }) => {
  const [displayBackPack, setDisplayBackpack] = useState(true);

  if (displayBackPack) {
    return (
      <RigidBody
        position={position}
        onCollisionEnter={(payload) => {
          if (payload.other.rigidBodyObject.name === ENTITY.PLAYER) {
            setPlayerPickedBackpack();
            setDisplayBackpack(false);
          }
        }}
      >
        <Backpack3DModel />
      </RigidBody>
    );
  }

  return null;
};
