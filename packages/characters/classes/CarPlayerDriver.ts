import { Vector3, Camera } from "three";
import { Ray } from "@dimforge/rapier3d-compat";

import { VectorSpringSimulator, RelativeSpringSimulator } from "../physics";
import { PlayerObjectReferences } from "../players/car-player/car-player";
import { CharacterABS, CharacterABSInterface } from "./Character/@CharacterABS";

const startingFPS = 60;
const carMass = 1500;
const speedDimmer = 0.9;
const rotationMass = 200;
const rotationDimmer = 0.6;
const gravityLimit = -30;

export class CarPlayerDriver
  extends CharacterABS
  implements CharacterABSInterface
{
  velocity = new Vector3();
  arcadeVelocityInfluence = new Vector3(1, 0, 1);
  arcadeVelocityTarget = new Vector3();
  velocitySimulator: VectorSpringSimulator;
  rotationSimulator: RelativeSpringSimulator;
  defaultVelocitySimulatorMass = carMass;
  defaultVelocitySimulatorDamping = speedDimmer;
  defaultRotationSimulatorMass = rotationMass;
  defaultRotationSimulatorDamping = rotationDimmer;
  runSpeed;
  walkSpeed;
  grounded = false;
  footShape = new Ray({ x: 0, y: 0, z: 0 }, { x: 0, y: -1, z: 0 });
  gravityLimit = gravityLimit;
  moveSpeed = 0;
  angularVelocity = 0;
  orientation = new Vector3(0, 0, 1);
  orientationTarget = new Vector3(0, 0, 1);
  viewVector = new Vector3();
  readonly position = new Vector3();

  constructor() {
    super();
  }
}
