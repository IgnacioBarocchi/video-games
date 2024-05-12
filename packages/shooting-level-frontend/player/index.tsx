import { useActor } from "@xstate/react";
import { useRef, useEffect } from "react";
import { Context } from "../providers/player-context-provider";
import {
  CapsuleCollider,
  CollisionPayload,
  CylinderCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { MaleCharacter3DModel } from "./MaleCharacter3DModel";

// import {
//   CapsuleCollider as Bounding,
//   RigidBody,
//   CylinderCollider as Sensor,
// } from "@react-three/rapier";

// import { Context } from "../../../providers/PlayerProvider";
// import { FC, Suspense, useEffect, useRef } from "react";
// import { BaseFSM, FSMStates } from "../../../lib/getBaseMachineInput";
// import { usePlayerLogic } from "../../../hooks/usePlayerLogic";
// import { rigidBodyColliderHandler } from "../../../lib/rigidBodyColliderHandler";
// import { PlayerID } from "../../../constants/entities";
// import { useGameStore } from "../../../hooks/useGameStore";
// import { Team } from "../../../data/types";

// export type PlayerProps = {
//   useOrbitControls: boolean;
//   Model: FC<{
//     machine: BaseFSM;
//   }>;
//   teamMembers: Team[];
//   position: [number, number, number];
// };

// export const Player: FC<PlayerProps> = ({
//     useOrbitControls,
//     teamMembers,
//     Model,
//     position,
//   })
export const Player = () => {
  const [state, send] = useActor(Context.useActorRef().logic);
  //   const { setEntityLoaded } = useGameStore((state) => ({
  //     setEntityLoaded: state.setEntityLoaded,
  //   }));

  //   const stateValue = state.value as FSMStates;
  //   const userData = useRef({
  //     id: PlayerID,
  //     stateValue,
  //     send,
  //     // todo: pass record
  //     team: "Archangel",
  //   });

  //   const { playerRigidBodyReference } = usePlayerLogic({
  //     useOrbitControls,
  //     machine: [state, send],
  //   });

  //   const { onCollisionEnter } = rigidBodyColliderHandler({
  //     send,
  //     teamMembers,
  //   });
  const playerRigidBodyReference = useRef(null);

  useEffect(() => {
    if (playerRigidBodyReference?.current) {
      send({
        type: "SET_CONTEXT",
        rigidBody: playerRigidBodyReference.current,
      });
    }

    console.log("RB");
  }, []);

  return (
    <RigidBody
      lockRotations={true}
      colliders={false}
      ref={playerRigidBodyReference}
      name={"Player"}
      //   userData={userData.current}
      //   position={position}
    >
      <MaleCharacter3DModel />
      {/* <Bounding
        args={[0.2, 0.6]}
        position={[0, 0.8, 0.2]}
        onCollisionEnter={onCollisionEnter}
      />
      <Sensor args={[0.2, 2]} position={[0, 0.5, 0]} sensor />
      <Suspense fallback={null}>
        <Model
          machine={[
            // @ts-ignore // Todo type this
            state,
            send,
          ]}
        />
      </Suspense> */}
    </RigidBody>
  );
};
