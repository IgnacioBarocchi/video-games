import * as THREE from 'three';
import { Outlines, useAnimations, useGLTF } from '@react-three/drei';
import { forwardRef, memo, useEffect, useMemo, useState } from 'react';
import { GLTF } from 'three-stdlib';
import { PlayerObjectReferences } from '.';
import { Animator } from './Animator';
import { useFrame } from '@react-three/fiber';

export type GLTFResult = GLTF & {
  nodes: {
    fm_Cube008mesh001: THREE.SkinnedMesh;
    fm_Cube008mesh001_1: THREE.SkinnedMesh;
    fm_Cube008mesh001_2: THREE.SkinnedMesh;
    fm_Cube008mesh001_3: THREE.SkinnedMesh;
    fm_Cube008mesh001_4: THREE.SkinnedMesh;
    fm_Cube008mesh001_5: THREE.SkinnedMesh;
    fm_Cube008mesh001_6: THREE.SkinnedMesh;
    ml_Cube001mesh: THREE.SkinnedMesh;
    ml_Cube001mesh_1: THREE.SkinnedMesh;
    ml_Cube001mesh_2: THREE.SkinnedMesh;
    ml_Cube001mesh_3: THREE.SkinnedMesh;
    ml_Cube001mesh_4: THREE.SkinnedMesh;
    ml_Cube001mesh_5: THREE.SkinnedMesh;
    ml_Cube001mesh_6: THREE.SkinnedMesh;
    ml_Cube001mesh001: THREE.SkinnedMesh;
    ml_Cube001mesh001_1: THREE.SkinnedMesh;
    ml_Cube001mesh001_2: THREE.SkinnedMesh;
    ml_Cube001mesh001_3: THREE.SkinnedMesh;
    ml_Cube001mesh001_4: THREE.SkinnedMesh;
    fm_Cube008mesh: THREE.SkinnedMesh;
    fm_Cube008mesh_1: THREE.SkinnedMesh;
    fm_Cube008mesh_2: THREE.SkinnedMesh;
    fm_Cube008mesh_3: THREE.SkinnedMesh;
    fm_Cube008mesh_4: THREE.SkinnedMesh;
    Interior: THREE.Mesh;
    Cube: THREE.Mesh;
    Cube_1: THREE.Mesh;
    Cube_2: THREE.Mesh;
    Cube_3: THREE.Mesh;
    Cube_4: THREE.Mesh;
    Cube_5: THREE.Mesh;
    Cube_6: THREE.Mesh;
    Command_Wheel: THREE.Mesh;
    Cylinder008: THREE.Mesh;
    Cylinder008_1: THREE.Mesh;
    Cylinder011: THREE.Mesh;
    Cylinder011_1: THREE.Mesh;
    mixamorigHips: THREE.Bone;
    mixamorigHips_1: THREE.Bone;
    mixamorigHips_2: THREE.Bone;
    mixamorigHips_3: THREE.Bone;
  };
  materials: {
    Hair: THREE.MeshStandardMaterial;
    Pants: THREE.MeshStandardMaterial;
    Skin: THREE.MeshStandardMaterial;
    Shoes: THREE.MeshStandardMaterial;
    Jacket: THREE.MeshStandardMaterial;
    Jacket_Details: THREE.MeshStandardMaterial;
    Shoes_details: THREE.MeshStandardMaterial;
    P_Skin: THREE.MeshStandardMaterial;
    P_Hair: THREE.MeshStandardMaterial;
    P_Jacket: THREE.MeshStandardMaterial;
    P_TShirt: THREE.MeshStandardMaterial;
    Belt: THREE.MeshStandardMaterial;
    P_Jean: THREE.MeshStandardMaterial;
    P_Shoes: THREE.MeshStandardMaterial;
    ['Passanger2 Jumper']: THREE.MeshStandardMaterial;
    ['Passanger2 Skin']: THREE.MeshStandardMaterial;
    ['Passanger2 Pants']: THREE.MeshStandardMaterial;
    ['Passanger2 Botts']: THREE.MeshStandardMaterial;
    ['Passanger2 Cap']: THREE.MeshStandardMaterial;
    ['Passanger3 Jacket']: THREE.MeshStandardMaterial;
    ['Passanger3 Pants']: THREE.MeshStandardMaterial;
    ['Passanger3 Boots']: THREE.MeshStandardMaterial;
    ['Passanger3 Hair']: THREE.MeshStandardMaterial;
    ['Passanger3 Skin']: THREE.MeshStandardMaterial;
    Interior: THREE.MeshStandardMaterial;
    car: THREE.MeshPhysicalMaterial;
    plastic: THREE.MeshStandardMaterial;
    backlight_top: THREE.MeshStandardMaterial;
    frontlight: THREE.MeshStandardMaterial;
    mirror: THREE.MeshStandardMaterial;
    backlight_bot: THREE.MeshStandardMaterial;
    glass: THREE.MeshPhysicalMaterial;
    ['Material.015']: THREE.MeshStandardMaterial;
    rubber: THREE.MeshStandardMaterial;
    wheel_metal: THREE.MeshStandardMaterial;
  };
};

export type ActionName =
  | 'Driving'
  | 'Idle'
  | 'Car Turn Left'
  | 'Car Turn Right'
  | 'Engine Running'
  | 'Passenger1 Idle'
  | 'Passanger2 Talking'
  | 'Passanger3 Talking';

export type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export const CarModel = memo(
  forwardRef<{}, PlayerObjectReferences>((_, ref) => {
    const [carDrivingState, setCarDrivingState] = useState('STOP');
    const { nodes, materials, animations } = useGLTF(
      '/../src/assets/models/Car/Car.gltf',
    ) as GLTFResult;

    const { actions } = useAnimations<GLTFActions>(
      animations,
      ref.current.modelRef,
    );

    const animator = useMemo(
      () =>
        new Animator({
          rigidbody: ref.current.rigidbody,
          actions,
          setCarDrivingState,
        }),
      [ref.current.rigidbody, actions],
    );

    useFrame(() => {
      if (!ref.current?.modelRef?.current || !ref.current?.rigidbody) {
        return;
      }
      animator.watchCarMovement();
    });

    useEffect(() => {
      if (!ref.current?.modelRef?.current || !ref.current?.rigidbody) {
        return;
      }

      if (carDrivingState.includes('LEFT')) {
        actions['Car Turn Left'].timeScale = 0.5;
        actions['Car Turn Left'].reset().play();
      } else {
        actions['Car Turn Left']
          .crossFadeTo(actions['Engine Running'], 1, true)
          .stop();
      }

      if (carDrivingState.includes('RIGHT')) {
        actions['Car Turn Right'].timeScale = 0.5;
        actions['Car Turn Right'].reset().play();
      } else {
        actions['Car Turn Right']
          .crossFadeTo(actions['Engine Running'], 1, true)
          .stop();
      }

      if (carDrivingState !== 'STOP') {
        actions['Engine Running'].reset().play();
      }

      actions.Driving.play();
      actions['Passenger1 Idle'].play();
      actions['Passanger2 Talking'].play();
      actions['Passanger3 Talking'].play();
    }, [carDrivingState, ref.current.rigidbody]);

    return (
      <group ref={ref.current.modelRef} dispose={null} castShadow>
        <group name='Scene'>
          <group
            name='Armature'
            position={[0.87, 0.38, -0.32]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <primitive object={nodes.mixamorigHips} />
            <group name='driver'>
              <skinnedMesh
                name='fm_Cube008mesh001'
                geometry={nodes.fm_Cube008mesh001.geometry}
                material={materials.Hair}
                skeleton={nodes.fm_Cube008mesh001.skeleton}
              />
              <skinnedMesh
                name='fm_Cube008mesh001_1'
                geometry={nodes.fm_Cube008mesh001_1.geometry}
                material={materials.Pants}
                skeleton={nodes.fm_Cube008mesh001_1.skeleton}
              />
              <skinnedMesh
                name='fm_Cube008mesh001_2'
                geometry={nodes.fm_Cube008mesh001_2.geometry}
                material={materials.Skin}
                skeleton={nodes.fm_Cube008mesh001_2.skeleton}
              />
              <skinnedMesh
                name='fm_Cube008mesh001_3'
                geometry={nodes.fm_Cube008mesh001_3.geometry}
                material={materials.Shoes}
                skeleton={nodes.fm_Cube008mesh001_3.skeleton}
              />
              <skinnedMesh
                name='fm_Cube008mesh001_4'
                geometry={nodes.fm_Cube008mesh001_4.geometry}
                material={materials.Jacket}
                skeleton={nodes.fm_Cube008mesh001_4.skeleton}
              />
              <skinnedMesh
                name='fm_Cube008mesh001_5'
                geometry={nodes.fm_Cube008mesh001_5.geometry}
                material={materials.Jacket_Details}
                skeleton={nodes.fm_Cube008mesh001_5.skeleton}
              />
              <skinnedMesh
                name='fm_Cube008mesh001_6'
                geometry={nodes.fm_Cube008mesh001_6.geometry}
                material={materials.Shoes_details}
                skeleton={nodes.fm_Cube008mesh001_6.skeleton}
              />
            </group>
          </group>
          {/* <group
            name='Passenger'
            position={[-0.85, 0.4, -0.36]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <primitive object={nodes.mixamorigHips_1} />
            <group name='ml_Cube001'>
              <skinnedMesh
                name='ml_Cube001mesh'
                geometry={nodes.ml_Cube001mesh.geometry}
                material={materials.P_Skin}
                skeleton={nodes.ml_Cube001mesh.skeleton}
              />
              <skinnedMesh
                name='ml_Cube001mesh_1'
                geometry={nodes.ml_Cube001mesh_1.geometry}
                material={materials.P_Hair}
                skeleton={nodes.ml_Cube001mesh_1.skeleton}
              />
              <skinnedMesh
                name='ml_Cube001mesh_2'
                geometry={nodes.ml_Cube001mesh_2.geometry}
                material={materials.P_Jacket}
                skeleton={nodes.ml_Cube001mesh_2.skeleton}
              />
              <skinnedMesh
                name='ml_Cube001mesh_3'
                geometry={nodes.ml_Cube001mesh_3.geometry}
                material={materials.P_TShirt}
                skeleton={nodes.ml_Cube001mesh_3.skeleton}
              />
              <skinnedMesh
                name='ml_Cube001mesh_4'
                geometry={nodes.ml_Cube001mesh_4.geometry}
                material={materials.Belt}
                skeleton={nodes.ml_Cube001mesh_4.skeleton}
              />
              <skinnedMesh
                name='ml_Cube001mesh_5'
                geometry={nodes.ml_Cube001mesh_5.geometry}
                material={materials.P_Jean}
                skeleton={nodes.ml_Cube001mesh_5.skeleton}
              />
              <skinnedMesh
                name='ml_Cube001mesh_6'
                geometry={nodes.ml_Cube001mesh_6.geometry}
                material={materials.P_Shoes}
                skeleton={nodes.ml_Cube001mesh_6.skeleton}
              />
            </group>
          </group>
          <group
            name='Passanger2'
            position={[0.98, 0.43, -2.37]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <primitive object={nodes.mixamorigHips_2} />
            <group name='ml_Cube002'>
              <skinnedMesh
                name='ml_Cube001mesh001'
                geometry={nodes.ml_Cube001mesh001.geometry}
                material={materials['Passanger2 Jumper']}
                skeleton={nodes.ml_Cube001mesh001.skeleton}
              />
              <skinnedMesh
                name='ml_Cube001mesh001_1'
                geometry={nodes.ml_Cube001mesh001_1.geometry}
                material={materials['Passanger2 Skin']}
                skeleton={nodes.ml_Cube001mesh001_1.skeleton}
              />
              <skinnedMesh
                name='ml_Cube001mesh001_2'
                geometry={nodes.ml_Cube001mesh001_2.geometry}
                material={materials['Passanger2 Pants']}
                skeleton={nodes.ml_Cube001mesh001_2.skeleton}
              />
              <skinnedMesh
                name='ml_Cube001mesh001_3'
                geometry={nodes.ml_Cube001mesh001_3.geometry}
                material={materials['Passanger2 Botts']}
                skeleton={nodes.ml_Cube001mesh001_3.skeleton}
              />
              <skinnedMesh
                name='ml_Cube001mesh001_4'
                geometry={nodes.ml_Cube001mesh001_4.geometry}
                material={materials['Passanger2 Cap']}
                skeleton={nodes.ml_Cube001mesh001_4.skeleton}
              />
            </group>
          </group>
          <group
            name='Passanger3'
            position={[-0.81, 0.49, -2.43]}
            rotation={[Math.PI / 2, 0, -0.31]}
          >
            <primitive object={nodes.mixamorigHips_3} />
            <group name='fm_Cube008'>
              <skinnedMesh
                name='fm_Cube008mesh'
                geometry={nodes.fm_Cube008mesh.geometry}
                material={materials['Passanger3 Jacket']}
                skeleton={nodes.fm_Cube008mesh.skeleton}
              />
              <skinnedMesh
                name='fm_Cube008mesh_1'
                geometry={nodes.fm_Cube008mesh_1.geometry}
                material={materials['Passanger3 Pants']}
                skeleton={nodes.fm_Cube008mesh_1.skeleton}
              />
              <skinnedMesh
                name='fm_Cube008mesh_2'
                geometry={nodes.fm_Cube008mesh_2.geometry}
                material={materials['Passanger3 Boots']}
                skeleton={nodes.fm_Cube008mesh_2.skeleton}
              />
              <skinnedMesh
                name='fm_Cube008mesh_3'
                geometry={nodes.fm_Cube008mesh_3.geometry}
                material={materials['Passanger3 Hair']}
                skeleton={nodes.fm_Cube008mesh_3.skeleton}
              />
              <skinnedMesh
                name='fm_Cube008mesh_4'
                geometry={nodes.fm_Cube008mesh_4.geometry}
                material={materials['Passanger3 Skin']}
                skeleton={nodes.fm_Cube008mesh_4.skeleton}
              />
            </group>
          </group> */}
          <mesh
            name='Interior'
            geometry={nodes.Interior.geometry}
            material={materials.Interior}
            position={[0, 0.38, 0]}
            scale={-0.14}
          />
          <group name='Exterior' position={[0, 1.63, 3.97]}>
            <mesh
              name='Cube'
              geometry={nodes.Cube.geometry}
              material={materials.car}
            >
              {/* <Outlines angle={89} thickness={0.1} color='red' /> */}
            </mesh>
            <mesh
              name='Cube_1'
              geometry={nodes.Cube_1.geometry}
              material={materials.plastic}
            />
            <mesh
              name='Cube_2'
              geometry={nodes.Cube_2.geometry}
              material={materials.backlight_top}
            />
            <mesh
              name='Cube_3'
              geometry={nodes.Cube_3.geometry}
              material={materials.frontlight}
            />
            <mesh
              name='Cube_4'
              geometry={nodes.Cube_4.geometry}
              material={materials.mirror}
            />
            <mesh
              name='Cube_5'
              geometry={nodes.Cube_5.geometry}
              material={materials.backlight_bot}
            />
            {/* <mesh
              name='Cube_6'
              geometry={nodes.Cube_6.geometry}
              material={materials.glass}
            /> */}
          </group>
          <mesh
            name='Command_Wheel'
            geometry={nodes.Command_Wheel.geometry}
            material={materials['Material.015']}
            position={[0.79, 2.61, 0.4]}
            rotation={[-1.26, 0, 0]}
            scale={0.31}
          />
          <group
            name='Front_Whels'
            position={[0, 0.73, 2.99]}
            rotation={[-Math.PI, 0, -Math.PI / 2]}
            scale={[-0.72, -0.31, -0.72]}
          >
            <mesh
              name='Cylinder008'
              geometry={nodes.Cylinder008.geometry}
              material={materials.rubber}
            />
            <mesh
              name='Cylinder008_1'
              geometry={nodes.Cylinder008_1.geometry}
              material={materials.wheel_metal}
            />
          </group>
          <group
            name='Back_Wheels'
            position={[0, 0.73, -3.38]}
            rotation={[-Math.PI, 0, -Math.PI / 2]}
            scale={[-0.72, -0.31, -0.72]}
          >
            <mesh
              name='Cylinder011'
              geometry={nodes.Cylinder011.geometry}
              material={materials.rubber}
            />
            <mesh
              name='Cylinder011_1'
              geometry={nodes.Cylinder011_1.geometry}
              material={materials.wheel_metal}
            />
          </group>
        </group>
      </group>
    );
  }),
);

useGLTF.preload('/../src/assets/models/Car/Car.gltf');

// const turnWheels = (side: 'L' | 'R', actions: GLTFActions) => {
//   if (
//     actions[`FL_Wheel_Turn_${side}`].isRunning() ||
//     actions[`FR_Wheel_Turn_${side}`].isRunning()
//   ) {
//     return;
//   }

//   actions[`FL_Wheel_Turn_${side}`].reset().play();
//   actions[`FR_Wheel_Turn_${side}`].reset().play();
// };

// const swingCar = (side: 'L' | 'R', actions: GLTFActions) => {
//   if (
//     actions[`Exterior_Turn_${side}`].isRunning() ||
//     actions[`Backlights_Turn_${side}`].isRunning()
//   ) {
//     return;
//   }

//   // actions[`Exterior_Turn_${side}`].setLoop(THREE.LoopOnce, 1);
//   // actions[`Exterior_Turn_${side}`].clampWhenFinished = true;
//   // actions[`Exterior_Turn_${side}`].enabled = true;
//   actions[`Exterior_Turn_${side}`].reset().play();

//   // actions[`Backlights_Turn_${side}`].setLoop(THREE.LoopOnce, 1);
//   // actions[`Backlights_Turn_${side}`].clampWhenFinished = true;
//   // actions[`Backlights_Turn_${side}`].enabled = true;
//   actions[`Backlights_Turn_${side}`].reset().play();
// };
