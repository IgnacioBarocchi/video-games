import * as THREE from 'three';
import { useAnimations, useGLTF } from '@react-three/drei';
import { forwardRef, memo, useEffect, useMemo, useState } from 'react';
import { GLTF } from 'three-stdlib';
import { PlayerObjectReferences } from '.';
import { Animator } from './Animator';
import { useFrame } from '@react-three/fiber';

export type GLTFResult = GLTF & {
  nodes: {
    Cylinder: THREE.Mesh;
    Cylinder_1: THREE.Mesh;
    Cylinder_2: THREE.Mesh;
    Cylinder_3: THREE.Mesh;
    ['1']: THREE.Mesh;
    Cylinder004: THREE.Mesh;
    Cylinder004_1: THREE.Mesh;
    Cylinder005: THREE.Mesh;
    Cylinder005_1: THREE.Mesh;
    Cylinder005_2: THREE.Mesh;
    Cylinder005_3: THREE.Mesh;
    Cylinder006: THREE.Mesh;
    Cylinder006_1: THREE.Mesh;
    Cylinder006_2: THREE.Mesh;
    Cylinder006_3: THREE.Mesh;
  };
  materials: {
    car_paint: THREE.MeshPhysicalMaterial;
    black_plastic_rough: THREE.MeshStandardMaterial;
    glass: THREE.MeshPhysicalMaterial;
    brakelights_red: THREE.MeshStandardMaterial;
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

const turnWheels = (side: 'L' | 'R', actions: GLTFActions) => {
  if (
    actions[`FL_Wheel_Turn_${side}`].isRunning() ||
    actions[`FR_Wheel_Turn_${side}`].isRunning()
  ) {
    return;
  }

  // actions[`FL_Wheel_Turn_${side}`].setLoop(THREE.LoopOnce, 1);
  // actions[`FL_Wheel_Turn_${side}`].clampWhenFinished = true;
  // actions[`FL_Wheel_Turn_${side}`].enabled = true;
  actions[`FL_Wheel_Turn_${side}`].reset().play();

  // actions[`FR_Wheel_Turn_${side}`].setLoop(THREE.LoopOnce, 1);
  // actions[`FR_Wheel_Turn_${side}`].clampWhenFinished = true;
  // actions[`FR_Wheel_Turn_${side}`].enabled = true;
  actions[`FR_Wheel_Turn_${side}`].reset().play();
};

const swingCar = (side: 'L' | 'R', actions: GLTFActions) => {
  if (
    actions[`Exterior_Turn_${side}`].isRunning() ||
    actions[`Backlights_Turn_${side}`].isRunning()
  ) {
    return;
  }

  // actions[`Exterior_Turn_${side}`].setLoop(THREE.LoopOnce, 1);
  // actions[`Exterior_Turn_${side}`].clampWhenFinished = true;
  // actions[`Exterior_Turn_${side}`].enabled = true;
  actions[`Exterior_Turn_${side}`].reset().play();

  // actions[`Backlights_Turn_${side}`].setLoop(THREE.LoopOnce, 1);
  // actions[`Backlights_Turn_${side}`].clampWhenFinished = true;
  // actions[`Backlights_Turn_${side}`].enabled = true;
  actions[`Backlights_Turn_${side}`].reset().play();
};

export const CarModel = memo(
  forwardRef<
    // { carGltfResult: GLTFResult; actions: GLTFActions; a: string },
    {},
    PlayerObjectReferences
  >((props, ref) => {
    const [carDrivingState, setCarDrivingState] = useState('STOP');
    const { nodes, materials, animations } = useGLTF(
      '/../src/assets/models/Car/Future_Car.gltf',
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
      // if (!ref.current?.modelRef?.current || !ref.current?.rigidbody) {
      //   return;
      // }
      // if (carDrivingState.includes('LEFT')) {
      //   console.log('LEFT');
      //   actions['Car Turn Left'].play();
      // } else {
      //   actions['Car Turn Left'].stop();
      // }
      // if (carDrivingState.includes('RIGHT')) {
      //   console.log('RIGHT');
      //   actions['Car Turn Right'].reset().play();
      // } else {
      //   actions['Car Turn Right'].stop();
      // }
      // if (carDrivingState !== 'STOP') {
      //   actions['Engine Running'].reset().play();
      // }
      // actions.Driving.play();
      // actions['Passenger1 Idle'].play();
      // actions['Passanger2 Talking'].play();
      // actions['Passanger3 Talking'].play();
      // if (carDrivingState === 'STOP') {
      //   actions.Driving_wheel_FR.stop();
      //   actions.Driving_wheel_BR.stop();
      //   actions.Driving_wheel_FL.stop();
      //   actions.Driving_wheel_BL.stop();
      //   actions.BK_Jiggle.fadeIn(1).stop();
      //   actions.Exterior_Jiggle.fadeIn(1).stop();
      //   actions.Interior_Jiggle.fadeIn(1).stop();
      //   actions.L_Blinker_Jiggle.fadeIn(1).stop();
      //   actions.R_Blinker_Jiggle.fadeIn(1).stop();
      //   actions.RFL_Jiggle.fadeIn(1).stop();
      // } else {
      //   actions.Driving_wheel_FR.play();
      //   actions.Driving_wheel_BR.play();
      //   actions.Driving_wheel_FL.play();
      //   actions.Driving_wheel_BL.play();
      // }
      // if (carDrivingState === 'STRAIGHT') {
      //   actions.FL_Wheel_Turn_L.stop();
      //   actions.FR_Wheel_Turn_L.stop();
      //   actions.Exterior_Turn_L.stop();
      //   actions.Backlights_Turn_L.stop();
      //   actions.FL_Wheel_Turn_R.stop();
      //   actions.FR_Wheel_Turn_R.stop();
      //   actions.Exterior_Turn_R.stop();
      //   actions.Backlights_Turn_R.stop();
      //   actions.BK_Jiggle.play();
      //   actions.Exterior_Jiggle.play();
      //   actions.Interior_Jiggle.play();
      //   actions.L_Blinker_Jiggle.play();
      //   actions.R_Blinker_Jiggle.play();
      //   actions.RFL_Jiggle.play();
      // }
      // if (carDrivingState === 'SWUNG LEFT') {
      //   turnWheels('L', actions);
      //   swingCar('L', actions);
      // } else if (carDrivingState === 'SWUNG RIGHT') {
      //   turnWheels('R', actions);
      //   swingCar('R', actions);
      // }
    }, [carDrivingState, ref.current.rigidbody]);

    return (
      <group ref={ref.current.modelRef} dispose={null} scale={0.5}>
        <group position={[0, -0.34, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.Cylinder007.geometry}
            material={materials.car_paint}
          />
          <mesh
            geometry={nodes.Cylinder007_1.geometry}
            material={materials.black_plastic_rough}
          />
          <mesh
            geometry={nodes.Cylinder007_2.geometry}
            material={materials.glass}
          />
          <mesh
            geometry={nodes.Cylinder007_3.geometry}
            material={materials.brakelights_red}
          />
        </group>
      </group>
    );
  }),
);

useGLTF.preload('/../src/assets/models/Car/Future_Car.gltf');
