import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { ShopModel } from "./ShopModel";
import { useState } from "react";
import useGameStore from "../../store/store";
import { Vector3 } from "three";
import moneyCounter from "../../assets/audio/money-counter.mp3";
import openGate from "../../assets/audio/open-gate.mp3";
import { ROAD_LENGTH } from "../../constants";
import { PositionalAudio } from "@react-three/drei";
import { payloadIsThePlayer } from "../../lib/rigibBodyHelper";

export const Shop = () => {
  const [state, setState] = useState("DOOR CLOSED");

  const { setGameOver, setHaveZombies, setTitle } = useGameStore((state) => ({
    setGameOver: state.setGameOver,
    setHaveZombies: state.setHaveZombies,
    setTitle: state.setTitle,
  }));

  return (
    <>
      <RigidBody
        type="fixed"
        colliders={false}
        position={[0, 0.5, -ROAD_LENGTH]}
      >
        <CuboidCollider
          name="Bumper"
          args={[15, 4, 1]}
          position={[-3, 0, -8]}
        />
        <CuboidCollider name="Bank" args={[3, 4, 6]} position={[23, 0, -14]} />
        <CuboidCollider
          name="Door column"
          args={[3, 5, 1]}
          position={[20.5, 0, 19]}
        />
        <CuboidCollider
          name="Door column"
          args={[3, 5, 1]}
          position={[-20.5, 0, 19]}
        />
        <CuboidCollider
          args={[3, 1, 6]}
          position={[16, 0, -20]}
          sensor
          onIntersectionEnter={(payload) => {
            if (payloadIsThePlayer(payload)) {
              setState("DOLLARS");
              payload.other.rigidBody?.setLinvel(new Vector3(0, 0, 0));
              setTimeout(() => {
                setGameOver({ reason: "WON" });
                new Audio(moneyCounter).play();
              }, 100);
            }
          }}
        />
        <CuboidCollider
          name="Gate trigger"
          args={[30, 30, 5]}
          position={[0, 0, 90]}
          sensor
          onIntersectionEnter={(payload) => {
            if (payloadIsThePlayer(payload)) {
              setState("DOOR OPEN");
              setTitle("Sucursal bancaria");
            }
          }}
        />
        <CuboidCollider
          name="Safe zone trigger"
          args={[30, 1, 2]}
          position={[0, 0, 16]}
          sensor
          onIntersectionEnter={(payload) => {
            if (payloadIsThePlayer(payload)) {
              setHaveZombies(false);
            }
          }}
        />

        {["DOOR OPEN", "DOLLARS"].includes(state) && (
          <ShopModel state={state} />
        )}
      </RigidBody>
      {state === "DOOR OPEN" && <PositionalAudio url={openGate} />}
    </>
  );
};
