import * as THREE from "three";

import { FC, useEffect, useRef, useState } from "react";

import { BARRIER_IMPACT_COST, HIGHWAY_X_POSITIONS } from "game-constants";
import { GLTF } from "three-stdlib";
import { PositionalAudio, useAnimations } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import barrierModelFile from "../../../assets/models/Barrier/Barrier.glb";
import concreteImpact from "../../../assets/audio/in-game-sfx/concrete-barrier/impact.m4a";
import { payloadIsThePlayer } from "../../../lib/rigibBodyHelper";
import { throttle } from "../../../lib/throttle";
import useCarGameStore from "../../../store/store";
import { useGLTF } from "@react-three/drei";

type GLTFResult = GLTF & {
  nodes: {
    CHUNK_2_MESH: THREE.Mesh;
    CHUNK_2_MESH_1: THREE.Mesh;
    CHUNK_2_MESH_2: THREE.Mesh;
    CHUNK_1_MESH: THREE.Mesh;
    CHUNK_1_MESH_1: THREE.Mesh;
    CHUNK_1_MESH_2: THREE.Mesh;
    CHUNK_1_MESH_3: THREE.Mesh;
    CHUNK_3_MESH: THREE.Mesh;
    CHUNK_3_MESH_1: THREE.Mesh;
    CHUNK_3_MESH_2: THREE.Mesh;
    CHUNK_4_MESH: THREE.Mesh;
    CHUNK_4_MESH_1: THREE.Mesh;
    CHUNK_4_MESH_2: THREE.Mesh;
    CHUNK_4_MESH_3: THREE.Mesh;
  };
  materials: {
    Road_Props_Yellow_Signal: THREE.MeshBasicMaterial;
    High_Concrete: THREE.MeshBasicMaterial;
    Concrete: THREE.MeshBasicMaterial;
    ["Road_Props_Yellow_Signal.002"]: THREE.MeshBasicMaterial;
    ["Road_Props_Yellow_Signal_Shade.002"]: THREE.MeshBasicMaterial;
    ["High_Concrete.002"]: THREE.MeshBasicMaterial;
    ["Concrete.002"]: THREE.MeshBasicMaterial;
    ["Road_Props_Yellow_Signal.003"]: THREE.MeshBasicMaterial;
    ["High_Concrete.003"]: THREE.MeshBasicMaterial;
    ["Concrete.003"]: THREE.MeshBasicMaterial;
    ["Road_Props_Yellow_Signal.004"]: THREE.MeshBasicMaterial;
    ["Road_Props_Yellow_Signal_Shade.004"]: THREE.MeshBasicMaterial;
    ["High_Concrete.004"]: THREE.MeshBasicMaterial;
    ["Concrete.004"]: THREE.MeshBasicMaterial;
  };
};

type ActionName =
  | "CHUNK_2A_BREAK"
  | "CHUNK_1_BREAK"
  | "CHUNK_3A_BREAK"
  | "CHUNK_4_BREAK";

type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export const BarrierModel: FC<{
  playAnimation: boolean;
  scale;
}> = ({ playAnimation, scale = new THREE.Vector3(1, 1, 1) }) => {
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF(
    barrierModelFile
  ) as GLTFResult;
  const { actions } = useAnimations<GLTFActions>(animations, group);

  useEffect(() => {
    if (!playAnimation) {
      return;
    }
    actions?.CHUNK_2A_BREAK?.setLoop(THREE.LoopOnce, 1);
    actions.CHUNK_2A_BREAK.clampWhenFinished = true;
    actions.CHUNK_2A_BREAK.enabled = true;
    actions.CHUNK_2A_BREAK.timeScale = 5;
    actions?.CHUNK_2A_BREAK?.play();

    actions?.CHUNK_1_BREAK?.setLoop(THREE.LoopOnce, 1);
    actions.CHUNK_1_BREAK.clampWhenFinished = true;
    actions.CHUNK_1_BREAK.enabled = true;
    actions.CHUNK_1_BREAK.timeScale = 5;
    actions?.CHUNK_1_BREAK?.play();

    actions?.CHUNK_3A_BREAK?.setLoop(THREE.LoopOnce, 1);
    actions.CHUNK_3A_BREAK.clampWhenFinished = true;
    actions.CHUNK_3A_BREAK.enabled = true;
    actions.CHUNK_3A_BREAK.timeScale = 5;
    actions?.CHUNK_3A_BREAK?.play();

    actions?.CHUNK_4_BREAK?.setLoop(THREE.LoopOnce, 1);
    actions.CHUNK_4_BREAK.clampWhenFinished = true;
    actions.CHUNK_4_BREAK.enabled = true;
    actions.CHUNK_4_BREAK.timeScale = 5;
    actions?.CHUNK_4_BREAK?.play();
  }, [playAnimation]);

  return (
    <group dispose={null} ref={group} scale={scale}>
      <group name="Scene">
        <group name="CHUNK_2" scale={[1, 0.59, 1]}>
          <mesh
            name="CHUNK_2_MESH"
            geometry={nodes.CHUNK_2_MESH.geometry}
            material={materials.Road_Props_Yellow_Signal}
          />
          <mesh
            name="CHUNK_2_MESH_1"
            geometry={nodes.CHUNK_2_MESH_1.geometry}
            material={materials.High_Concrete}
          />
          <mesh
            name="CHUNK_2_MESH_2"
            geometry={nodes.CHUNK_2_MESH_2.geometry}
            material={materials.Concrete}
          />
        </group>
        <group name="CHUNK_1" scale={[1, 0.59, 1]}>
          <mesh
            name="CHUNK_1_MESH"
            geometry={nodes.CHUNK_1_MESH.geometry}
            material={materials["Road_Props_Yellow_Signal.002"]}
          />
          <mesh
            name="CHUNK_1_MESH_1"
            geometry={nodes.CHUNK_1_MESH_1.geometry}
            material={materials["Road_Props_Yellow_Signal_Shade.002"]}
          />
          <mesh
            name="CHUNK_1_MESH_2"
            geometry={nodes.CHUNK_1_MESH_2.geometry}
            material={materials["High_Concrete.002"]}
          />
          <mesh
            name="CHUNK_1_MESH_3"
            geometry={nodes.CHUNK_1_MESH_3.geometry}
            material={materials["Concrete.002"]}
          />
        </group>
        <group name="CHUNK_3" scale={[1, 0.59, 1]}>
          <mesh
            name="CHUNK_3_MESH"
            geometry={nodes.CHUNK_3_MESH.geometry}
            material={materials["Road_Props_Yellow_Signal.003"]}
          />
          <mesh
            name="CHUNK_3_MESH_1"
            geometry={nodes.CHUNK_3_MESH_1.geometry}
            material={materials["High_Concrete.003"]}
          />
          <mesh
            name="CHUNK_3_MESH_2"
            geometry={nodes.CHUNK_3_MESH_2.geometry}
            material={materials["Concrete.003"]}
          />
        </group>
        <group name="CHUNK_4" scale={[1, 0.59, 1]}>
          <mesh
            name="CHUNK_4_MESH"
            geometry={nodes.CHUNK_4_MESH.geometry}
            material={materials["Road_Props_Yellow_Signal.004"]}
          />
          <mesh
            name="CHUNK_4_MESH_1"
            geometry={nodes.CHUNK_4_MESH_1.geometry}
            material={materials["Road_Props_Yellow_Signal_Shade.004"]}
          />
          <mesh
            name="CHUNK_4_MESH_2"
            geometry={nodes.CHUNK_4_MESH_2.geometry}
            material={materials["High_Concrete.004"]}
          />
          <mesh
            name="CHUNK_4_MESH_3"
            geometry={nodes.CHUNK_4_MESH_3.geometry}
            material={materials["Concrete.004"]}
          />
        </group>
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
  const [shouldRender, setShouldRender] = useState(true);

  const handleBarrierImpact = throttle((payload) => {
    if (!payloadIsThePlayer(payload)) {
      return;
    }

    payload.other.rigidBody.setLinvel(new THREE.Vector3(0, 1, 2), true);
    registerCrashCount();
    setCarNotification({ type: "HIT BARRIER", cost: BARRIER_IMPACT_COST });
    subMoney(BARRIER_IMPACT_COST);
    setShouldPlayAudio(true);

    setTimeout(() => {
      setShouldRender(false);
    }, 500);
  }, 1000);

  if (!shouldRender) {
    return null;
  }

  return (
    <>
      <RigidBody
        position={position}
        onCollisionEnter={handleBarrierImpact}
        gravityScale={3}
        colliders={false}
      >
        <CuboidCollider position={[0, 0.5, 0]} args={[1, 0.5, 0.2]} />
        <BarrierModel playAnimation={shouldPlayAudio} />
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

const distance = 20;
const positions = Object.values(HIGHWAY_X_POSITIONS);

export const Barriers = ({ count = 100 }) => {
  let selector = 0;
  let positionZ = 0;
  let offset = 1;

  return (
    <>
      {[...Array(count)].map((_, i) => {
        selector > positions.length - 1 ? (selector = 0) : selector++;
        positionZ = positionZ - offset * distance;
        let positionX = positions[selector];

        offset =
          positionX === HIGHWAY_X_POSITIONS.MIDDLE_TRACK_X ? (offset = -1) : 1;
        return <Barrier key={i} position={[positionX, 0, positionZ]} />;
      })}
    </>
  );
};

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

/* {[...Array(25)].map((_, i) => (
  <Barrier
    key={i}
    position={[
      -getBarrierXPosition(),
      0,
      i * -Math.floor(Math.random() * (50 - 25) + 25) - 2,
    ]}
  />
))} */
