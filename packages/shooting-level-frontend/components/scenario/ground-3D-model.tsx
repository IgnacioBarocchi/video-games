import { LoopOnce } from "three";
import { useAnimations, useGLTF } from "@react-three/drei";
import groundModelFile from "../../assets/models/Ground.glb";
import { useRef, useEffect } from "react";
import { GLTFResult, GLTFActions } from "../../player/MaleCharacter3DModel";
import { GroupProps } from "@react-three/fiber";

export const Ground3DModel = ({ shouldOpenTheDoor }) => {
  const group = useRef<GroupProps>();
  const { nodes, materials, animations } = useGLTF(
    groundModelFile
  ) as GLTFResult;
  const { actions } = useAnimations<GLTFActions>(animations, group);

  useEffect(() => {
    if (shouldOpenTheDoor) {
      actions.OPEN_DOOR.clampWhenFinished = true;
      actions.OPEN_DOOR.setLoop(LoopOnce, 1);
      actions.OPEN_DOOR.play();
    }
  }, [shouldOpenTheDoor]);

  return (
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
  );
};

useGLTF.preload(groundModelFile);
