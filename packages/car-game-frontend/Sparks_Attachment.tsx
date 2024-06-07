/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 assets/models/Sparks_Attachment/Sparks_Attachment.glb -t -r public
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    SPARKS: THREE.Mesh
  }
  materials: {
    E: THREE.MeshBasicMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/../assets/models/Sparks_Attachment/Sparks_Attachment.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.SPARKS.geometry} material={materials.E} position={[0.35, 0.23, 0]} rotation={[1.52, 0.17, -2.87]} scale={[-0.14, -0.14, -0.02]} />
    </group>
  )
}

useGLTF.preload('/../assets/models/Sparks_Attachment/Sparks_Attachment.glb')