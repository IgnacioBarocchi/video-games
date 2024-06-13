import * as THREE from "three";

import {
  CollisionPayload,
  CuboidCollider,
  RigidBody,
} from "@react-three/rapier";
import { ENTITY, ROAD_LENGTH, SPEED_FEE_COST } from "game-constants";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";

import { GLTF } from "three-stdlib";
import checkpoint3DModelFile from "../../../assets/models/Checkpoint/Checkpoint.glb";
import useCarGameStore from "../../../store/store";
import { createOnceFunction } from "game-lib";
import openGateSFX from "../../../assets/audio/in-game-sfx/open-gate/open-gate.mp3";

type GLTFResult = GLTF & {
  nodes: {
    SPEED_CHECK_MESH: THREE.Mesh;
    SPEED_CHECK_MESH_1: THREE.Mesh;
    SPEED_CHECK_MESH_2: THREE.Mesh;
    SPEED_CHECK_MESH_3: THREE.Mesh;
    SPEED_CHECK_MESH_4: THREE.Mesh;
    SPEED_CHECK_MESH_5: THREE.Mesh;
    SPEED_CHECK_MESH_6: THREE.Mesh;
    BANNER_MESH: THREE.Mesh;
    BANNER_MESH_1: THREE.Mesh;
    BANNER_MESH_2: THREE.Mesh;
    BANNER_MESH_3: THREE.Mesh;
    BANNER_MESH_4: THREE.Mesh;
    SPEED_CHECK_MESH001: THREE.Mesh;
    SPEED_CHECK_MESH001_1: THREE.Mesh;
    SPEED_CHECK_MESH001_2: THREE.Mesh;
    SPEED_CHECK_MESH001_3: THREE.Mesh;
    SPEED_CHECK_MESH001_4: THREE.Mesh;
    SPEED_CHECK_MESH001_5: THREE.Mesh;
    Cube: THREE.Mesh;
    Cube_1: THREE.Mesh;
    Cube_2: THREE.Mesh;
    SIGN_MESH: THREE.Mesh;
    SIGN_MESH_1: THREE.Mesh;
    SIGN_MESH_2: THREE.Mesh;
    SIGN_MESH_3: THREE.Mesh;
  };
  materials: {
    Road_Props_Yellow_Signal: THREE.MeshBasicMaterial;
    Concrete_4: THREE.MeshBasicMaterial;
    Car_Plastic_Base: THREE.MeshBasicMaterial;
    Concrete_5: THREE.MeshBasicMaterial;
    Metal: THREE.MeshBasicMaterial;
    Metal_Shade: THREE.MeshBasicMaterial;
    Screen: THREE.MeshBasicMaterial;
    Argentina_Banner_Base: THREE.MeshBasicMaterial;
    Flag_White: THREE.MeshBasicMaterial;
    Flag_Yellow: THREE.MeshBasicMaterial;
    Banner_Black: THREE.MeshBasicMaterial;
    Letters: THREE.MeshBasicMaterial;
    Sign: THREE.MeshBasicMaterial;
  };
};

type ActionName = "OPEN_GATE";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

const Model = ({ playOpenGate }) => {
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF(
    checkpoint3DModelFile
  ) as GLTFResult;
  const { actions } = useAnimations<GLTFActions>(animations, group);

  useEffect(() => {
    if (playOpenGate) {
      actions.OPEN_GATE.setLoop(THREE.LoopOnce, 1);
      actions.OPEN_GATE.clampWhenFinished = true;
      actions.OPEN_GATE.enabled = true;
      actions.OPEN_GATE.play();
    }
  }, [playOpenGate]);

  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="SPEED_CHECK">
          <mesh
            name="SPEED_CHECK_MESH"
            geometry={nodes.SPEED_CHECK_MESH.geometry}
            material={materials.Road_Props_Yellow_Signal}
          />
          <mesh
            name="SPEED_CHECK_MESH_1"
            geometry={nodes.SPEED_CHECK_MESH_1.geometry}
            material={materials.Concrete_4}
          />
          <mesh
            name="SPEED_CHECK_MESH_2"
            geometry={nodes.SPEED_CHECK_MESH_2.geometry}
            material={materials.Car_Plastic_Base}
          />
          <mesh
            name="SPEED_CHECK_MESH_3"
            geometry={nodes.SPEED_CHECK_MESH_3.geometry}
            material={materials.Concrete_5}
          />
          <mesh
            name="SPEED_CHECK_MESH_4"
            geometry={nodes.SPEED_CHECK_MESH_4.geometry}
            material={materials.Metal}
          />
          <mesh
            name="SPEED_CHECK_MESH_5"
            geometry={nodes.SPEED_CHECK_MESH_5.geometry}
            material={materials.Metal_Shade}
          />
          <mesh
            name="SPEED_CHECK_MESH_6"
            geometry={nodes.SPEED_CHECK_MESH_6.geometry}
            material={materials.Screen}
          />
          <group
            name="BANNER"
            position={[-4.9, 3.84, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[2.77, 0.56, 0.56]}
          >
            <mesh
              name="BANNER_MESH"
              geometry={nodes.BANNER_MESH.geometry}
              material={materials.Metal_Shade}
            />
            <mesh
              name="BANNER_MESH_1"
              geometry={nodes.BANNER_MESH_1.geometry}
              material={materials.Argentina_Banner_Base}
            />
            <mesh
              name="BANNER_MESH_2"
              geometry={nodes.BANNER_MESH_2.geometry}
              material={materials.Flag_White}
            />
            <mesh
              name="BANNER_MESH_3"
              geometry={nodes.BANNER_MESH_3.geometry}
              material={materials.Flag_Yellow}
            />
            <mesh
              name="BANNER_MESH_4"
              geometry={nodes.BANNER_MESH_4.geometry}
              material={materials.Banner_Black}
            />
          </group>
        </group>
        <group name="GAGTE" position={[0, 0, -29.38]}>
          <mesh
            name="SPEED_CHECK_MESH001"
            geometry={nodes.SPEED_CHECK_MESH001.geometry}
            material={materials.Road_Props_Yellow_Signal}
          />
          <mesh
            name="SPEED_CHECK_MESH001_1"
            geometry={nodes.SPEED_CHECK_MESH001_1.geometry}
            material={materials.Concrete_4}
          />
          <mesh
            name="SPEED_CHECK_MESH001_2"
            geometry={nodes.SPEED_CHECK_MESH001_2.geometry}
            material={materials.Car_Plastic_Base}
          />
          <mesh
            name="SPEED_CHECK_MESH001_3"
            geometry={nodes.SPEED_CHECK_MESH001_3.geometry}
            material={materials.Concrete_5}
          />
          <mesh
            name="SPEED_CHECK_MESH001_4"
            geometry={nodes.SPEED_CHECK_MESH001_4.geometry}
            material={materials.Metal}
          />
          <mesh
            name="SPEED_CHECK_MESH001_5"
            geometry={nodes.SPEED_CHECK_MESH001_5.geometry}
            material={materials.Metal_Shade}
          />
          <group
            name="GATE_FENCE"
            position={[0, 0.93, -0.03]}
            scale={[8.24, 1, 0.05]}
          >
            <mesh
              name="Cube"
              geometry={nodes.Cube.geometry}
              material={materials.Road_Props_Yellow_Signal}
            />
            <mesh
              name="Cube_1"
              geometry={nodes.Cube_1.geometry}
              material={materials.Metal_Shade}
            />
            <mesh
              name="Cube_2"
              geometry={nodes.Cube_2.geometry}
              material={materials.Metal}
            />
          </group>
        </group>
        <group name="SIGN" scale={[1, 0.48, 1]}>
          <mesh
            name="SIGN_MESH"
            geometry={nodes.SIGN_MESH.geometry}
            material={materials.Metal}
          />
          <mesh
            name="SIGN_MESH_1"
            geometry={nodes.SIGN_MESH_1.geometry}
            material={materials.Metal_Shade}
          />
          <mesh
            name="SIGN_MESH_2"
            geometry={nodes.SIGN_MESH_2.geometry}
            material={materials.Letters}
          />
          <mesh
            name="SIGN_MESH_3"
            geometry={nodes.SIGN_MESH_3.geometry}
            material={materials.Sign}
          />
        </group>
      </group>
    </group>
  );
};

const SPEED_LIMIT = 30;
const ALERT_DISTANCE = 500;

const Alert = () => {
  const setTitle = useCarGameStore(useCallback((state) => state.setTitle, []));

  const intersectionHandler = createOnceFunction(() => {
    setTitle("Control de velocidad a " + ALERT_DISTANCE + "m");

    const gateAudio = new Audio(openGateSFX);
    gateAudio.volume = 0.3;
    gateAudio.play();
  });

  return (
    <CuboidCollider
      sensor
      name="control title"
      position={[0, 1.5, ALERT_DISTANCE]}
      args={[10, 1.5, 1]}
      onIntersectionEnter={(payload) => {
        if (payload?.other?.rigidBodyObject?.name === ENTITY.CAR) {
          intersectionHandler();
        }
      }}
    />
  );
};
export function Checkpoint() {
  const subMoney = useCarGameStore(useCallback((state) => state.subMoney, []));
  const setCarNotification = useCarGameStore(
    useCallback((state) => state.setCarNotification, [])
  );
  const [playOpenGate, setPlayOpenGate] = useState(false);
  const collisionCallback = createOnceFunction((payload: CollisionPayload) => {
    setPlayOpenGate(true);
    if (Math.abs(payload?.other?.rigidBody?.linvel().z!) > SPEED_LIMIT) {
      setCarNotification({ type: "SPEED FEE", cost: SPEED_FEE_COST });
      subMoney(SPEED_FEE_COST);
    }
  });

  return (
    <RigidBody
      position={[0, 0, -ROAD_LENGTH + 300]}
      type="fixed"
      colliders={false}
    >
      <CuboidCollider
        position={[0, 1.5, 0]}
        args={[10, 1.5, 0.5]}
        sensor
        onIntersectionEnter={(payload) => {
          if (payload?.other?.rigidBodyObject?.name === ENTITY.CAR) {
            console.log("TRIGGERED");
            collisionCallback(payload);
          }
        }}
      />
      <Alert />
      <CuboidCollider
        name="r col"
        position={[8.5, 1.5, 0]}
        args={[0.5, 1.5, 1]}
      />
      <CuboidCollider
        name="r col"
        position={[-8.5, 1.5, 0]}
        args={[0.5, 1.5, 1]}
      />
      <CuboidCollider
        name="ar col"
        position={[8.5, 1.5, -29.5]}
        args={[0.5, 1.5, 0.5]}
      />
      <CuboidCollider
        name="ar col"
        position={[-8.5, 1.5, -29.5]}
        args={[0.5, 1.5, 0.5]}
      />
      <CuboidCollider
        name="ar col"
        position={[0, 1.5, -49]}
        args={[1, 1.5, 1]}
      />
      <Model playOpenGate={playOpenGate} />
    </RigidBody>
  );
}

useGLTF.preload(checkpoint3DModelFile);
