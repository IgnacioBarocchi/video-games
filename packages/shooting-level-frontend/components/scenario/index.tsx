import { useState, useContext } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { ENTITY } from "game-constants";
import useGameContext from "game-constants/hooks/use-game-context";
import { Ground3DModel } from "./ground-3D-model";
import { Context } from "characters";

const FenceColliders = () => {
  return (
    <>
      <CuboidCollider position={[10.5, 1, 0]} args={[0.2, 1, 12]} />
      <CuboidCollider position={[-10.5, 1, 0]} args={[0.2, 1, 12]} />
      <CuboidCollider position={[0, 1, -10.5]} args={[12, 1, 0.2]} />
      <CuboidCollider position={[6.5, 1, 10.5]} args={[5, 1, 0.2]} />
      <CuboidCollider position={[-6.5, 1, 10.5]} args={[5, 1, 0.2]} />
    </>
  );
};

const RoomDoodadsColliders = () => {
  return (
    <>
      <CuboidCollider position={[-9, 0, -5]} args={[0.5, 0.2, 1]} />
      <CuboidCollider position={[-9.5, 0, -7.7]} args={[0.25, 0.5, 0.4]} />
    </>
  );
};

const ElevatorColliders = ({ onElevatorNear, onIntersectionEnter }) => {
  return (
    <>
      <CuboidCollider
        name="Start Car Game Portal"
        position={[0, 0, -9.5]}
        args={[1, 2, 1]}
        sensor
        onIntersectionEnter={onIntersectionEnter}
      />
      <CuboidCollider
        name="Open the Door Sensor"
        position={[0, 0, -8]}
        args={[1.2, 2, 1]}
        sensor
        onIntersectionEnter={onElevatorNear}
      />
      <CuboidCollider
        name="Wall Collider"
        position={[1, 0, -9.3]}
        args={[0.2, 2, 1]}
      />

      <CuboidCollider
        name="Wall Collider"
        position={[-1, 0, -9.3]}
        args={[0.2, 2, 1]}
      />
    </>
  );
};

export function Scenario() {
  const playerActor = useContext(Context);
  const { changeGameState } = useGameContext();
  const [canEnterNextLevel, setCanEnterNextLevel] = useState(false);

  return (
    <RigidBody type="fixed" position={[0, 0, 0]} colliders={false}>
      <CuboidCollider args={[200, 0, 200]} />
      <RoomDoodadsColliders />
      <FenceColliders />
      <ElevatorColliders
        playerPickedBackpack={canEnterNextLevel}
        onElevatorNear={(payload) => {
          console.log(payload?.other?.rigidBodyObject?.name);
          if (payload.other.rigidBodyObject.name === ENTITY.PLAYER) {
            const isWearingBackpack =
              typeof playerActor.getSnapshot()?.context?.mesh?.nodes
                ?.BACKPACK_MESH?.visible === "undefined";

            if (isWearingBackpack) {
              setCanEnterNextLevel(true);
            }
          }
        }}
        onIntersectionEnter={(payload) => {
          if (
            payload.other.rigidBodyObject.name === ENTITY.PLAYER &&
            canEnterNextLevel
          ) {
            changeGameState("CAR GAME");
          }
        }}
      />
      <Ground3DModel shouldOpenTheDoor={canEnterNextLevel} />
    </RigidBody>
  );
}

// playerPickedBackpack,
// if (!playerPickedBackpack) {
//   return (
//     <CuboidCollider
//       name="Collider"
//       position={[0, 0, -9.3]}
//       args={[1.1, 2, 1]}
//       sensor
//       onIntersectionEnter={onIntersectionEnter}
//     />
//   );
// }
