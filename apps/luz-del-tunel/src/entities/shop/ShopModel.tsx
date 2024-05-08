import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import shopModelFile from "../../assets/models/Shop/Shop.gltf";

type GLTFResult = GLTF & {
  nodes: {
    Seller_Cube001mesh: THREE.SkinnedMesh;
    Seller_Cube001mesh_1: THREE.SkinnedMesh;
    Seller_Cube001mesh_2: THREE.SkinnedMesh;
    Seller_Cube001mesh_3: THREE.SkinnedMesh;
    Seller_Cube001mesh_4: THREE.SkinnedMesh;
    Seller_Cube001mesh_5: THREE.SkinnedMesh;
    Ground: THREE.Mesh;
    Plane_1: THREE.Mesh;
    Plane_2: THREE.Mesh;
    Plane_3: THREE.Mesh;
    Plane_4: THREE.Mesh;
    Plane_5: THREE.Mesh;
    Cube003_1: THREE.Mesh;
    Cube003_2: THREE.Mesh;
    Cube003_3: THREE.Mesh;
    Cube003_4: THREE.Mesh;
    Cube003_5: THREE.Mesh;
    Cube006_1: THREE.Mesh;
    Cube006_2: THREE.Mesh;
    Cube006_3: THREE.Mesh;
    Cube006_4: THREE.Mesh;
    Cube006_5: THREE.Mesh;
    Cube007_1: THREE.Mesh;
    Cube007_2: THREE.Mesh;
    Cube007_3: THREE.Mesh;
    Cube009_1: THREE.Mesh;
    Cube009_2: THREE.Mesh;
    Cube009_3: THREE.Mesh;
    Cube009_4: THREE.Mesh;
    Cube004_1: THREE.Mesh;
    Cube004_2: THREE.Mesh;
    Cube004_3: THREE.Mesh;
    Cube004_4: THREE.Mesh;
    Cube010: THREE.Mesh;
    Cube010_1: THREE.Mesh;
    Cube010_2: THREE.Mesh;
    Cube010_3: THREE.Mesh;
    Cube011: THREE.Mesh;
    Cube011_1: THREE.Mesh;
    Cube011_2: THREE.Mesh;
    Cube011_3: THREE.Mesh;
    Cube012: THREE.Mesh;
    Cube012_1: THREE.Mesh;
    Cube012_2: THREE.Mesh;
    Cube012_3: THREE.Mesh;
    Cube013: THREE.Mesh;
    Cube013_1: THREE.Mesh;
    Cube013_2: THREE.Mesh;
    Cube013_3: THREE.Mesh;
    Cube014: THREE.Mesh;
    Cube014_1: THREE.Mesh;
    Cube014_2: THREE.Mesh;
    Cube014_3: THREE.Mesh;
    Cube015: THREE.Mesh;
    Cube015_1: THREE.Mesh;
    Cube015_2: THREE.Mesh;
    Cube015_3: THREE.Mesh;
    Cube016: THREE.Mesh;
    Cube016_1: THREE.Mesh;
    Cube016_2: THREE.Mesh;
    Cube016_3: THREE.Mesh;
    Plane: THREE.Mesh;
    Cube005_1: THREE.Mesh;
    Cube005_2: THREE.Mesh;
    Cube005_3: THREE.Mesh;
    Cube008_1: THREE.Mesh;
    Cube008_2: THREE.Mesh;
    Cube008_3: THREE.Mesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    Skin: THREE.MeshBasicMaterial;
    Jumper: THREE.MeshBasicMaterial;
    Hair: THREE.MeshBasicMaterial;
    Skin_Shade: THREE.MeshBasicMaterial;
    Pants: THREE.MeshBasicMaterial;
    Jumper_Shade: THREE.MeshBasicMaterial;
    Terrain: THREE.MeshBasicMaterial;
    Red: THREE.MeshStandardMaterial;
    White_Paint: THREE.MeshBasicMaterial;
    ["Asphalt.001"]: THREE.MeshBasicMaterial;
    Alert: THREE.MeshBasicMaterial;
    ["Black.001"]: THREE.MeshBasicMaterial;
    Concrete_Building: THREE.MeshBasicMaterial;
    Concrete_Shade: THREE.MeshBasicMaterial;
    Concrete_Dark: THREE.MeshBasicMaterial;
    Concrete_High: THREE.MeshBasicMaterial;
    Window: THREE.MeshBasicMaterial;
    Building: THREE.MeshBasicMaterial;
    Table: THREE.MeshBasicMaterial;
    Dollar: THREE.MeshBasicMaterial;
    Dollar_Shade: THREE.MeshBasicMaterial;
    Paper: THREE.MeshBasicMaterial;
  };
};

type ActionName = "Open_Gate" | "Selling";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export function ShopModel({ state }) {
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF(shopModelFile) as GLTFResult;

  const { actions } = useAnimations<GLTFActions>(animations, group);

  useEffect(() => {
    // actions['Seller_Idle'].play();
    actions.Selling.play();
    if (state === "DOOR OPEN") {
      actions["Open_Gate"].setLoop(THREE.LoopOnce, 1);
      actions["Open_Gate"].clampWhenFinished = true;
      actions["Open_Gate"].enabled = true;
      actions["Open_Gate"].timeScale = 0.35;
      actions["Open_Gate"].play();
    }
  }, [state]);

  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group
          name="Armature"
          position={[21.73, 1.84, -10.75]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        >
          <primitive object={nodes.mixamorigHips} />
          <group name="Seller_Cube001">
            <skinnedMesh
              name="Seller_Cube001mesh"
              geometry={nodes.Seller_Cube001mesh.geometry}
              material={materials.Skin}
              skeleton={nodes.Seller_Cube001mesh.skeleton}
            />
            <skinnedMesh
              name="Seller_Cube001mesh_1"
              geometry={nodes.Seller_Cube001mesh_1.geometry}
              material={materials.Jumper}
              skeleton={nodes.Seller_Cube001mesh_1.skeleton}
            />
            <skinnedMesh
              name="Seller_Cube001mesh_2"
              geometry={nodes.Seller_Cube001mesh_2.geometry}
              material={materials.Hair}
              skeleton={nodes.Seller_Cube001mesh_2.skeleton}
            />
            <skinnedMesh
              name="Seller_Cube001mesh_3"
              geometry={nodes.Seller_Cube001mesh_3.geometry}
              material={materials.Skin_Shade}
              skeleton={nodes.Seller_Cube001mesh_3.skeleton}
            />
            <skinnedMesh
              name="Seller_Cube001mesh_4"
              geometry={nodes.Seller_Cube001mesh_4.geometry}
              material={materials.Pants}
              skeleton={nodes.Seller_Cube001mesh_4.skeleton}
            />
            <skinnedMesh
              name="Seller_Cube001mesh_5"
              geometry={nodes.Seller_Cube001mesh_5.geometry}
              material={materials.Jumper_Shade}
              skeleton={nodes.Seller_Cube001mesh_5.skeleton}
            />
          </group>
        </group>
        <mesh
          name="Ground"
          geometry={nodes.Ground.geometry}
          material={materials.Terrain}
          scale={2}
        />
        <group
          name="Asphalt"
          position={[0, 0, 26.01]}
          rotation={[-Math.PI, 0, 0]}
          scale={[-31.05, -2.02, -58.59]}
        >
          <mesh
            name="Plane_1"
            geometry={nodes.Plane_1.geometry}
            material={materials.Red}
          />
          <mesh
            name="Plane_2"
            geometry={nodes.Plane_2.geometry}
            material={materials.White_Paint}
          />
          <mesh
            name="Plane_3"
            geometry={nodes.Plane_3.geometry}
            material={materials["Asphalt.001"]}
          />
          <mesh
            name="Plane_4"
            geometry={nodes.Plane_4.geometry}
            material={materials.Alert}
          />
          <mesh
            name="Plane_5"
            geometry={nodes.Plane_5.geometry}
            material={materials["Black.001"]}
          />
        </group>
        <group
          name="Service"
          position={[22.14, 2.82, -13.51]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.98}
        >
          <mesh
            name="Cube003_1"
            geometry={nodes.Cube003_1.geometry}
            material={materials.Concrete_Building}
          />
          <mesh
            name="Cube003_2"
            geometry={nodes.Cube003_2.geometry}
            material={materials.Concrete_Shade}
          />
          <mesh
            name="Cube003_3"
            geometry={nodes.Cube003_3.geometry}
            material={materials.Concrete_Dark}
          />
          <mesh
            name="Cube003_4"
            geometry={nodes.Cube003_4.geometry}
            material={materials.Concrete_High}
          />
          <mesh
            name="Cube003_5"
            geometry={nodes.Cube003_5.geometry}
            material={materials.Window}
          />
        </group>
        <group
          name="Bank"
          position={[-4.83, 16.66, -15.81]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.98}
        >
          <mesh
            name="Cube006_1"
            geometry={nodes.Cube006_1.geometry}
            material={materials.Concrete_Building}
          />
          <mesh
            name="Cube006_2"
            geometry={nodes.Cube006_2.geometry}
            material={materials.Concrete_High}
          />
          <mesh
            name="Cube006_3"
            geometry={nodes.Cube006_3.geometry}
            material={materials.Concrete_Dark}
          />
          <mesh
            name="Cube006_4"
            geometry={nodes.Cube006_4.geometry}
            material={materials.Concrete_Shade}
          />
          <mesh
            name="Cube006_5"
            geometry={nodes.Cube006_5.geometry}
            material={materials.Window}
          />
        </group>
        <group name="Gate" scale={[17.93, 4.02, 0.43]}>
          <mesh
            name="Cube007_1"
            geometry={nodes.Cube007_1.geometry}
            material={materials.Building}
          />
          <mesh
            name="Cube007_2"
            geometry={nodes.Cube007_2.geometry}
            material={materials.Alert}
          />
          <mesh
            name="Cube007_3"
            geometry={nodes.Cube007_3.geometry}
            material={materials["Black.001"]}
          />
        </group>
        <group
          name="Gate_Colums"
          position={[-18.54, 0, 19.08]}
          rotation={[-Math.PI, 0, 0]}
          scale={-1}
        >
          <mesh
            name="Cube009_1"
            geometry={nodes.Cube009_1.geometry}
            material={materials.Building}
          />
          <mesh
            name="Cube009_2"
            geometry={nodes.Cube009_2.geometry}
            material={materials.Concrete_Shade}
          />
          <mesh
            name="Cube009_3"
            geometry={nodes.Cube009_3.geometry}
            material={materials.Concrete_Dark}
          />
          <mesh
            name="Cube009_4"
            geometry={nodes.Cube009_4.geometry}
            material={materials.Concrete_High}
          />
        </group>
        <group
          name="Cube002"
          position={[-4.88, 7.68, -18.11]}
          scale={[17.4, 1, 13.17]}
        >
          <mesh
            name="Cube004_1"
            geometry={nodes.Cube004_1.geometry}
            material={materials.Concrete_High}
          />
          <mesh
            name="Cube004_2"
            geometry={nodes.Cube004_2.geometry}
            material={materials.Concrete_Shade}
          />
          <mesh
            name="Cube004_3"
            geometry={nodes.Cube004_3.geometry}
            material={materials.Concrete_Dark}
          />
          <mesh
            name="Cube004_4"
            geometry={nodes.Cube004_4.geometry}
            material={materials.Concrete_Building}
          />
        </group>
        <group
          name="Cube001"
          position={[15.55, 7.68, -18.11]}
          scale={[17.4, 1, 13.17]}
        >
          <mesh
            name="Cube010"
            geometry={nodes.Cube010.geometry}
            material={materials.Concrete_High}
          />
          <mesh
            name="Cube010_1"
            geometry={nodes.Cube010_1.geometry}
            material={materials.Concrete_Shade}
          />
          <mesh
            name="Cube010_2"
            geometry={nodes.Cube010_2.geometry}
            material={materials.Concrete_Dark}
          />
          <mesh
            name="Cube010_3"
            geometry={nodes.Cube010_3.geometry}
            material={materials.Concrete_Building}
          />
        </group>
        <group
          name="Cube003"
          position={[5.04, 23.75, -14.51]}
          scale={[4.6, 1, 13.17]}
        >
          <mesh
            name="Cube011"
            geometry={nodes.Cube011.geometry}
            material={materials.Concrete_High}
          />
          <mesh
            name="Cube011_1"
            geometry={nodes.Cube011_1.geometry}
            material={materials.Concrete_Shade}
          />
          <mesh
            name="Cube011_2"
            geometry={nodes.Cube011_2.geometry}
            material={materials.Concrete_Dark}
          />
          <mesh
            name="Cube011_3"
            geometry={nodes.Cube011_3.geometry}
            material={materials.Concrete_Building}
          />
        </group>
        <group
          name="Cube004"
          position={[-14.57, 23.75, -14.51]}
          scale={[4.6, 1, 13.17]}
        >
          <mesh
            name="Cube012"
            geometry={nodes.Cube012.geometry}
            material={materials.Concrete_High}
          />
          <mesh
            name="Cube012_1"
            geometry={nodes.Cube012_1.geometry}
            material={materials.Concrete_Shade}
          />
          <mesh
            name="Cube012_2"
            geometry={nodes.Cube012_2.geometry}
            material={materials.Concrete_Dark}
          />
          <mesh
            name="Cube012_3"
            geometry={nodes.Cube012_3.geometry}
            material={materials.Concrete_Building}
          />
        </group>
        <group
          name="Cube005"
          position={[5.41, 14.02, -14.51]}
          scale={[4.78, 1, 13.17]}
        >
          <mesh
            name="Cube013"
            geometry={nodes.Cube013.geometry}
            material={materials.Concrete_High}
          />
          <mesh
            name="Cube013_1"
            geometry={nodes.Cube013_1.geometry}
            material={materials.Concrete_Shade}
          />
          <mesh
            name="Cube013_2"
            geometry={nodes.Cube013_2.geometry}
            material={materials.Concrete_Dark}
          />
          <mesh
            name="Cube013_3"
            geometry={nodes.Cube013_3.geometry}
            material={materials.Concrete_Building}
          />
        </group>
        <group
          name="Cube006"
          position={[-14.94, 14.02, -14.51]}
          scale={[4.78, 1, 13.17]}
        >
          <mesh
            name="Cube014"
            geometry={nodes.Cube014.geometry}
            material={materials.Concrete_High}
          />
          <mesh
            name="Cube014_1"
            geometry={nodes.Cube014_1.geometry}
            material={materials.Concrete_Shade}
          />
          <mesh
            name="Cube014_2"
            geometry={nodes.Cube014_2.geometry}
            material={materials.Concrete_Dark}
          />
          <mesh
            name="Cube014_3"
            geometry={nodes.Cube014_3.geometry}
            material={materials.Concrete_Building}
          />
        </group>
        <group
          name="Cube007"
          position={[5.72, 5.17, -14.51]}
          scale={[6.13, 1, 13.17]}
        >
          <mesh
            name="Cube015"
            geometry={nodes.Cube015.geometry}
            material={materials.Concrete_High}
          />
          <mesh
            name="Cube015_1"
            geometry={nodes.Cube015_1.geometry}
            material={materials.Concrete_Shade}
          />
          <mesh
            name="Cube015_2"
            geometry={nodes.Cube015_2.geometry}
            material={materials.Concrete_Dark}
          />
          <mesh
            name="Cube015_3"
            geometry={nodes.Cube015_3.geometry}
            material={materials.Concrete_Building}
          />
        </group>
        <group
          name="Cube008"
          position={[-15.07, 5.17, -14.51]}
          scale={[5.27, 1, 13.17]}
        >
          <mesh
            name="Cube016"
            geometry={nodes.Cube016.geometry}
            material={materials.Concrete_High}
          />
          <mesh
            name="Cube016_1"
            geometry={nodes.Cube016_1.geometry}
            material={materials.Concrete_Shade}
          />
          <mesh
            name="Cube016_2"
            geometry={nodes.Cube016_2.geometry}
            material={materials.Concrete_Dark}
          />
          <mesh
            name="Cube016_3"
            geometry={nodes.Cube016_3.geometry}
            material={materials.Concrete_Building}
          />
        </group>
        <mesh
          name="Plane"
          geometry={nodes.Plane.geometry}
          material={materials.Table}
          position={[21.14, 3.49, -10.66]}
          scale={[0.38, 1, 1]}
        />
        <group
          name="Cube"
          position={[20.93, 3.53, -11.18]}
          scale={[0.05, 0.06, 0.06]}
        >
          <mesh
            name="Cube005_1"
            geometry={nodes.Cube005_1.geometry}
            material={materials.Dollar}
          />
          <mesh
            name="Cube005_2"
            geometry={nodes.Cube005_2.geometry}
            material={materials.Dollar_Shade}
          />
          <mesh
            name="Cube005_3"
            geometry={nodes.Cube005_3.geometry}
            material={materials.Paper}
          />
        </group>
        <group
          name="Cube009"
          position={[21.12, 3.53, -10.89]}
          rotation={[0, 0.59, 0]}
          scale={[0.05, 0.06, 0.06]}
        >
          <mesh
            name="Cube008_1"
            geometry={nodes.Cube008_1.geometry}
            material={materials.Dollar}
          />
          <mesh
            name="Cube008_2"
            geometry={nodes.Cube008_2.geometry}
            material={materials.Dollar_Shade}
          />
          <mesh
            name="Cube008_3"
            geometry={nodes.Cube008_3.geometry}
            material={materials.Paper}
          />
        </group>
        <mesh
          name="Plane001"
          geometry={nodes.Plane001.geometry}
          material={materials.Arrow}
          position={[16.49, 7.71, -13.51]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.37, 1, 1]}
        />
      </group>
    </group>
  );
}

useGLTF.preload(shopModelFile);
