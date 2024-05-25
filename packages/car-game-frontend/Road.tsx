/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 assets/models/Road/Road.glb -t -r public
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    ROAD_1: THREE.Mesh
    ROAD_2: THREE.Mesh
    ROAD_3: THREE.Mesh
    ROAD_4: THREE.Mesh
    ROAD_5: THREE.Mesh
  }
  materials: {
    Concrete_1: THREE.MeshBasicMaterial
    Concrete_2: THREE.MeshBasicMaterial
    Concrete_4: THREE.MeshBasicMaterial
    Grass: THREE.MeshBasicMaterial
    Concrete_5: THREE.MeshBasicMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/../assets/models/Road/Road.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.ROAD_1.geometry} material={materials.Concrete_1} />
      <mesh geometry={nodes.ROAD_2.geometry} material={materials.Concrete_2} />
      <mesh geometry={nodes.ROAD_3.geometry} material={materials.Concrete_4} />
      <mesh geometry={nodes.ROAD_4.geometry} material={materials.Grass} />
      <mesh geometry={nodes.ROAD_5.geometry} material={materials.Concrete_5} />
    </group>
  )
}

useGLTF.preload('/../assets/models/Road/Road.glb')