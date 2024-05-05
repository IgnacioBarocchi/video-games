import { useRef } from "react";
import { CarModel } from "../player/model";
import { RapierRigidBody } from "@react-three/rapier";
import { Object3D } from "three";
import { useFrame } from "@react-three/fiber";

export const LobbyTurnTable = () => {
  const playerObjectReferences = useRef({
    rigidbody: useRef<RapierRigidBody>(null),
    modelRef: useRef<Object3D>(null),
  });

  useFrame((_, delta) => {
    if (!playerObjectReferences.current) return;

    const rotationSpeed = 0.5;
    if (playerObjectReferences.current.modelRef.current) {
      const { rotation } = playerObjectReferences.current.modelRef.current;
      rotation.y += rotationSpeed * delta;
    }
  });

  return <CarModel ref={playerObjectReferences} />;
};
