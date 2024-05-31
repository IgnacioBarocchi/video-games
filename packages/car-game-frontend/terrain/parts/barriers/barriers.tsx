import * as THREE from "three";

import { FC, useState } from "react";

import { BARRIER_IMPACT_COST } from "game-constants";
import { GLTF } from "three-stdlib";
import { PositionalAudio } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import barrierModelFile from "../../../assets/models/Barrier/Barrier.glb";
import concreteImpact from "../../../assets/audio/in-game-sfx/concrete-barrier/impact.m4a";
import { payloadIsThePlayer } from "../../../lib/rigibBodyHelper";
import { throttle } from "../../../lib/throttle";
import useCarGameStore from "../../../store/store";
import { useGLTF } from "@react-three/drei";

type GLTFResult = GLTF & {
  nodes: {
    BARRIER_MESH: THREE.Mesh;
    BARRIER_MESH_1: THREE.Mesh;
    BARRIER_MESH_2: THREE.Mesh;
    BARRIER_MESH_3: THREE.Mesh;
  };
  materials: {
    Road_Props_Yellow_Signal: THREE.MeshBasicMaterial;
    Road_Props_Yellow_Signal_Shade: THREE.MeshBasicMaterial;
    High_Concrete: THREE.MeshBasicMaterial;
    Concrete: THREE.MeshBasicMaterial;
  };
};

export const BarrierModel: FC<{
  props?: JSX.IntrinsicElements["group"];
}> = (props) => {
  const { nodes, materials } = useGLTF(barrierModelFile) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group scale={[1, 0.59, 1]}>
        <mesh
          geometry={nodes.BARRIER_MESH.geometry}
          material={materials.Road_Props_Yellow_Signal}
        />
        <mesh
          geometry={nodes.BARRIER_MESH_1.geometry}
          material={materials.Road_Props_Yellow_Signal_Shade}
        />
        <mesh
          geometry={nodes.BARRIER_MESH_2.geometry}
          material={materials.High_Concrete}
        />
        <mesh
          geometry={nodes.BARRIER_MESH_3.geometry}
          material={materials.Concrete}
        />
      </group>
    </group>
  );
};

useGLTF.preload(barrierModelFile);

export const Barrier: FC<{ position: [number, number, number] }> = ({
  position,
}) => {
  const { registerCrashCount, setCarNotification, subMoney } = useCarGameStore(
    (state) => ({
      registerCrashCount: state.registerCrashCount,
      setCarNotification: state.setCarNotification,
      subMoney: state.subMoney,
    })
  );

  const [shouldPlayAudio, setShouldPlayAudio] = useState(false);

  const handleBarrierImpact = throttle((payload) => {
    if (!payloadIsThePlayer(payload)) {
      return;
    }

    payload.other.rigidBody.setLinvel(new THREE.Vector3(0, 1, 2), true);
    registerCrashCount();
    setCarNotification({ type: "HIT BARRIER", cost: BARRIER_IMPACT_COST });
    subMoney(BARRIER_IMPACT_COST);
    setShouldPlayAudio(true);
  }, 1000);

  return (
    <>
      <RigidBody
        colliders={"cuboid"}
        type="fixed"
        position={position}
        onCollisionEnter={handleBarrierImpact}
      >
        <BarrierModel />
      </RigidBody>
      {shouldPlayAudio && (
        <PositionalAudio
          distance={20}
          loop={false}
          url={concreteImpact}
          autoplay
        />
      )}
    </>
  );
};

const getBarrierXPosition = () => {
  const n = Math.random();
  return n > 0.33 ? 6 : n > 66 ? 3 : 0;
};

export const Barriers = () => {
  return (
    <>
      {[...Array(25)].map((_, i) => (
        <Barrier
          key={i}
          position={[
            getBarrierXPosition(),
            0,
            i * -Math.floor(Math.random() * (50 - 25) + 25) - 2,
          ]}
        />
      ))}
      {[...Array(25)].map((_, i) => (
        <Barrier
          key={i}
          position={[
            -getBarrierXPosition(),
            0,
            i * -Math.floor(Math.random() * (50 - 25) + 25) - 2,
          ]}
        />
      ))}
    </>
  );

  // return (
  //   <>
  //     <EntitiesRegion
  //       name="Barriers"
  //       depth={2000}
  //       ZOffset={400}
  //       numberOfEntities={[10, 10]}
  //       Entity={Barrier}
  //       spaceBetween={{ x: [-15, 15], y: 0 }}
  //     />
  //   </>
  // );
};

/*
  const debounce = (func, delay) => {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  };

  debounce(() => {
  if (!payloadIsCar(payload)) {
    return;
  }
  registerCrashCount();
  setShouldPlayAudio(true);
  console.log('hit');
}, 500);
*/
