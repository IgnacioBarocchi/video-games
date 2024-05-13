/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 assets/models/Ground.glb -t -r public
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    GROUND_MESH: THREE.Mesh
    GROUND_MESH_1: THREE.Mesh
    FENCE_MESH: THREE.Mesh
    FENCE_MESH_1: THREE.Mesh
    COLUMNS: THREE.Mesh
    ELEVATOR_MESH: THREE.Mesh
    ELEVATOR_MESH_1: THREE.Mesh
    ELEVATOR_MESH_2: THREE.Mesh
    ELEVATOR_MESH_3: THREE.Mesh
    COMPUTER_STUFF_MESH: THREE.Mesh
    COMPUTER_STUFF_MESH_1: THREE.Mesh
    COMPUTER_STUFF_MESH_2: THREE.Mesh
    BED_MESH: THREE.Mesh
    BED_MESH_1: THREE.Mesh
    BED_MESH_2: THREE.Mesh
    DOOR: THREE.Mesh
  }
  materials: {
    Concrete_4: THREE.MeshBasicMaterial
    Concrete_5: THREE.MeshBasicMaterial
    Rust_Base: THREE.MeshBasicMaterial
    Rust_Shade: THREE.MeshBasicMaterial
    Concrete_3: THREE.MeshBasicMaterial
    Concrete_2: THREE.MeshBasicMaterial
    Concrete_1: THREE.MeshBasicMaterial
    CPU: THREE.MeshBasicMaterial
    Screen: THREE.MeshBasicMaterial
    Plastic: THREE.MeshBasicMaterial
    Cloth: THREE.MeshBasicMaterial
    Cloth_Details: THREE.MeshBasicMaterial
    Matres: THREE.MeshBasicMaterial
  }
}

type ActionName = 'OPEN_DOOR'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF('/../assets/models/Ground.glb') as GLTFResult
  const { actions } = useAnimations<GLTFActions>(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="GROUND" position={[-0.02, 0, 0.01]}>
          <mesh name="GROUND_MESH" geometry={nodes.GROUND_MESH.geometry} material={materials.Concrete_4} />
          <mesh name="GROUND_MESH_1" geometry={nodes.GROUND_MESH_1.geometry} material={materials.Concrete_5} />
        </group>
        <group name="FENCE" position={[-0.02, 0, 0.01]}>
          <mesh name="FENCE_MESH" geometry={nodes.FENCE_MESH.geometry} material={materials.Rust_Base} />
          <mesh name="FENCE_MESH_1" geometry={nodes.FENCE_MESH_1.geometry} material={materials.Rust_Shade} />
        </group>
        <mesh name="COLUMNS" geometry={nodes.COLUMNS.geometry} material={materials.Concrete_3} position={[-11.7, 0.01, -11.85]} />
        <group name="ELEVATOR" position={[-0.02, 1.08, -9.43]}>
          <mesh name="ELEVATOR_MESH" geometry={nodes.ELEVATOR_MESH.geometry} material={materials.Concrete_2} />
          <mesh name="ELEVATOR_MESH_1" geometry={nodes.ELEVATOR_MESH_1.geometry} material={materials.Concrete_1} />
          <mesh name="ELEVATOR_MESH_2" geometry={nodes.ELEVATOR_MESH_2.geometry} material={materials.Concrete_4} />
          <mesh name="ELEVATOR_MESH_3" geometry={nodes.ELEVATOR_MESH_3.geometry} material={materials.Concrete_3} />
        </group>
        <group name="COMPUTER_STUFF" position={[-9.43, 0.27, -7.68]} scale={[0.27, 0.27, 0.08]}>
          <mesh name="COMPUTER_STUFF_MESH" geometry={nodes.COMPUTER_STUFF_MESH.geometry} material={materials.CPU} />
          <mesh name="COMPUTER_STUFF_MESH_1" geometry={nodes.COMPUTER_STUFF_MESH_1.geometry} material={materials.Screen} />
          <mesh name="COMPUTER_STUFF_MESH_2" geometry={nodes.COMPUTER_STUFF_MESH_2.geometry} material={materials.Plastic} />
        </group>
        <group name="BED" position={[-8.92, 0.2, -4.96]}>
          <mesh name="BED_MESH" geometry={nodes.BED_MESH.geometry} material={materials.Cloth} />
          <mesh name="BED_MESH_1" geometry={nodes.BED_MESH_1.geometry} material={materials.Cloth_Details} />
          <mesh name="BED_MESH_2" geometry={nodes.BED_MESH_2.geometry} material={materials.Matres} />
        </group>
        <mesh name="DOOR" geometry={nodes.DOOR.geometry} material={materials.Concrete_4} position={[-0.7, 0.87, -8.6]} scale={[1, 0.83, 0.05]} />
      </group>
    </group>
  )
}

useGLTF.preload('/../assets/models/Ground.glb')