import { Vector3 } from "three";
import { Ray } from "@dimforge/rapier3d-compat";
import { RelativeSpringSimulator } from "physics";
import { VectorSpringSimulator } from "physics";
import { ObjectRef, RigidBodyRef } from "../types";

export class Mob {
  // player;
  velocity = new Vector3();
  arcadeVelocityInfluence = new Vector3(1, 0, 1);
  arcadeVelocityTarget = new Vector3();
  velocitySimulator: VectorSpringSimulator;
  rotationSimulator: RelativeSpringSimulator;

  defaultVelocitySimulatorMass = 44;
  defaultVelocitySimulatorDamping = 0.74;
  defaultRotationSimulatorMass = 4.4;
  defaultRotationSimulatorDamping = 0.44;
  grounded = false;
  footShape = new Ray({ x: 0, y: 0, z: 0 }, { x: 0, y: -1, z: 0 });
  gravityLimit = -26;
  moveSpeed = 0;
  angularVelocity = 0;
  orientation = new Vector3(0, 0, 1);
  orientationTarget = new Vector3(0, 0, 1);
  viewVector = new Vector3();
  readonly position = new Vector3();

  rigidbody: RigidBodyRef;
  private model: ObjectRef;

  constructor(props: { rigidbody: RigidBodyRef; model: ObjectRef }) {
    // this.player = props.player;
    this.rigidbody = props.rigidbody;
    this.model = props.model;

    this.velocitySimulator = new VectorSpringSimulator(
      60,
      this.defaultVelocitySimulatorMass,
      this.defaultVelocitySimulatorDamping
    );
    this.rotationSimulator = new RelativeSpringSimulator(
      60,
      this.defaultRotationSimulatorMass,
      this.defaultRotationSimulatorDamping
    );
  }

  update(timeStep: number) {
    // this.updateModelRotation();
    // this.updateModelTranslation();
  }

  updateModelRotation() {
    // const playerPosition = this.player.rigidbody?.current?.translate();
  }

  updateModelTranslation() {
    // const playerPosition = this.player.rigidbody?.current?.translate();
  }

  private updatePositionFromRigidbody() {
    if (!this.rigidbody.current) return;
    const { x, y, z } = this.rigidbody.current.translation();
    this.position.set(x, y, z);
  }
}
