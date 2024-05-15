import * as THREE from "three";
import { useRef, useEffect, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import groundModelFile from "../assets/models/Ground.glb";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

type GLTFResult = GLTF & {
  nodes: {
    GROUND_MESH: THREE.Mesh;
    GROUND_MESH_1: THREE.Mesh;
    FENCE_MESH: THREE.Mesh;
    FENCE_MESH_1: THREE.Mesh;
    COLUMNS: THREE.Mesh;
    ELEVATOR_MESH: THREE.Mesh;
    ELEVATOR_MESH_1: THREE.Mesh;
    ELEVATOR_MESH_2: THREE.Mesh;
    ELEVATOR_MESH_3: THREE.Mesh;
    COMPUTER_STUFF_MESH: THREE.Mesh;
    COMPUTER_STUFF_MESH_1: THREE.Mesh;
    COMPUTER_STUFF_MESH_2: THREE.Mesh;
    BED_MESH: THREE.Mesh;
    BED_MESH_1: THREE.Mesh;
    BED_MESH_2: THREE.Mesh;
    DOOR: THREE.Mesh;
  };
  materials: {
    Concrete_4: THREE.MeshBasicMaterial;
    Concrete_5: THREE.MeshBasicMaterial;
    Rust_Base: THREE.MeshBasicMaterial;
    Rust_Shade: THREE.MeshBasicMaterial;
    Concrete_3: THREE.MeshBasicMaterial;
    Concrete_2: THREE.MeshBasicMaterial;
    Concrete_1: THREE.MeshBasicMaterial;
    CPU: THREE.MeshBasicMaterial;
    Screen: THREE.MeshBasicMaterial;
    Plastic: THREE.MeshBasicMaterial;
    Cloth: THREE.MeshBasicMaterial;
    Cloth_Details: THREE.MeshBasicMaterial;
    Matres: THREE.MeshBasicMaterial;
  };
};

type ActionName = "OPEN_DOOR";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

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

export function GroundModel({ onMissionPicked }) {
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF(
    groundModelFile
  ) as GLTFResult;
  const [shouldOpenTheDoor, setShouldOpenTheDoor] = useState(false);
  const { actions } = useAnimations<GLTFActions>(animations, group);

  useEffect(() => {
    if (shouldOpenTheDoor) {
      actions.OPEN_DOOR.clampWhenFinished = true;
      actions.OPEN_DOOR.setLoop(THREE.LoopOnce, 1);
      actions.OPEN_DOOR.play();
    }
  }, [shouldOpenTheDoor]);

  return (
    <RigidBody type="fixed" position={[0, 0, 0]} colliders={false}>
      <CuboidCollider args={[200, 0, 200]} />
      <RoomDoodadsColliders />
      <FenceColliders />
      <ElevatorColliders
        onElevatorNear={() => setShouldOpenTheDoor(true)}
        onIntersectionEnter={onMissionPicked}
      />
      <group ref={group} dispose={null}>
        <group name="Scene">
          <group name="GROUND" position={[-0.02, 0, 0.01]}>
            <mesh
              name="GROUND_MESH"
              geometry={nodes.GROUND_MESH.geometry}
              material={materials.Concrete_4}
            />
            <mesh
              name="GROUND_MESH_1"
              geometry={nodes.GROUND_MESH_1.geometry}
              material={materials.Concrete_5}
            />
          </group>
          <group name="FENCE" position={[-0.02, 0, 0.01]}>
            <mesh
              name="FENCE_MESH"
              geometry={nodes.FENCE_MESH.geometry}
              material={materials.Rust_Base}
            />
            <mesh
              name="FENCE_MESH_1"
              geometry={nodes.FENCE_MESH_1.geometry}
              material={materials.Rust_Shade}
            />
          </group>
          <mesh
            name="COLUMNS"
            geometry={nodes.COLUMNS.geometry}
            material={materials.Concrete_3}
            position={[-11.7, 0.01, -11.85]}
          />
          <group name="ELEVATOR" position={[-0.02, 1.08, -9.43]}>
            <mesh
              name="ELEVATOR_MESH"
              geometry={nodes.ELEVATOR_MESH.geometry}
              material={materials.Concrete_2}
            />
            <mesh
              name="ELEVATOR_MESH_1"
              geometry={nodes.ELEVATOR_MESH_1.geometry}
              material={materials.Concrete_1}
            />
            <mesh
              name="ELEVATOR_MESH_2"
              geometry={nodes.ELEVATOR_MESH_2.geometry}
              material={materials.Concrete_4}
            />
            <mesh
              name="ELEVATOR_MESH_3"
              geometry={nodes.ELEVATOR_MESH_3.geometry}
              material={materials.Concrete_3}
            />
          </group>
          <group
            name="COMPUTER_STUFF"
            position={[-9.43, 0.27, -7.68]}
            scale={[0.27, 0.27, 0.08]}
          >
            <mesh
              name="COMPUTER_STUFF_MESH"
              geometry={nodes.COMPUTER_STUFF_MESH.geometry}
              material={materials.CPU}
            />
            <mesh
              name="COMPUTER_STUFF_MESH_1"
              geometry={nodes.COMPUTER_STUFF_MESH_1.geometry}
              material={materials.Screen}
            />
            <mesh
              name="COMPUTER_STUFF_MESH_2"
              geometry={nodes.COMPUTER_STUFF_MESH_2.geometry}
              material={materials.Plastic}
            />
          </group>
          <group name="BED" position={[-8.92, 0.2, -4.96]}>
            <mesh
              name="BED_MESH"
              geometry={nodes.BED_MESH.geometry}
              material={materials.Cloth}
            />
            <mesh
              name="BED_MESH_1"
              geometry={nodes.BED_MESH_1.geometry}
              material={materials.Cloth_Details}
            />
            <mesh
              name="BED_MESH_2"
              geometry={nodes.BED_MESH_2.geometry}
              material={materials.Matres}
            />
          </group>
          <mesh
            name="DOOR"
            geometry={nodes.DOOR.geometry}
            material={materials.Concrete_4}
            position={[-0.7, 0.87, -8.6]}
            scale={[1, 0.83, 0.05]}
          />
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload(groundModelFile);
