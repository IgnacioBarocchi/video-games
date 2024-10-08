import {
  Camera,
  MathUtils,
  Matrix4,
  Quaternion,
  Vector3,
  Vector3Tuple,
} from "three";
import { Ray } from "@dimforge/rapier3d-compat";
import { RelativeSpringSimulator } from "../../physics";
import { VectorSpringSimulator } from "../../physics";
import {
  applyVectorMatrixXZ,
  getSignedAngleBetweenVectors,
  lerpVectors,
} from "../helpers";
import { input } from "../../controls/input";
import { PlayerObjectReferences } from "../../players/car-player/car-player";

// Abstract class Character
export abstract class Character {
  velocity = new Vector3();
  arcadeVelocityInfluence = new Vector3(1, 0, 1);
  arcadeVelocityTarget = new Vector3();
  velocitySimulator: VectorSpringSimulator;
  rotationSimulator: RelativeSpringSimulator;
  grounded = false;
  footShape = new Ray({ x: 0, y: 0, z: 0 }, { x: 0, y: -1, z: 0 });
  gravityLimit = -30;
  moveSpeed = 0;
  angularVelocity = 0;
  orientation = new Vector3(0, 0, 1);
  orientationTarget = new Vector3(0, 0, 1);
  viewVector = new Vector3();
  readonly position = new Vector3();
  public previousDrivingState = "STOP";
  public drivingState = "STOP";
  public playerObjectReferences: PlayerObjectReferences;
  private camera: Camera;

  constructor(props: {
    orientation?: Vector3Tuple;
    camera: Camera;
    playerObjectReferences: PlayerObjectReferences;
  }) {
    this.playerObjectReferences = props.playerObjectReferences;
    this.camera = props.camera;

    const orientation = props.orientation ?? [0, 0, 1];
    this.orientation = new Vector3(
      orientation[0],
      orientation[1],
      orientation[2]
    );
    this.orientationTarget = new Vector3(
      orientation[0],
      orientation[1],
      orientation[2]
    );

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

  protected abstract get defaultVelocitySimulatorMass(): number;
  protected abstract get defaultVelocitySimulatorDamping(): number;
  protected abstract get defaultRotationSimulatorMass(): number;
  protected abstract get defaultRotationSimulatorDamping(): number;
  protected abstract get runSpeed(): number;
  protected abstract get walkSpeed(): number;

  setArcadeVelocityInfluence(x: number, y: number = x, z: number = x): void {
    this.arcadeVelocityInfluence.set(x, y, z);
  }

  setViewVector(vector: Vector3): void {
    this.viewVector.copy(vector).normalize();
  }

  lookVector = new Vector3();
  setOrientation(vector: Vector3): void {
    this.lookVector.copy(vector).setY(0).normalize();
    this.orientationTarget.copy(this.lookVector);
  }

  updateSimulators(frameRate) {
    this.velocitySimulator = new VectorSpringSimulator(
      frameRate,
      this.defaultVelocitySimulatorMass,
      this.defaultVelocitySimulatorDamping
    );
    this.rotationSimulator = new RelativeSpringSimulator(
      frameRate,
      this.defaultRotationSimulatorMass,
      this.defaultRotationSimulatorDamping
    );
  }

  updateViewVector() {
    this.viewVector.subVectors(this.position, this.camera.position);
  }

  update(timeStep: number, frameRate: number = 60) {
    // this.updateSimulators(frameRate);
    this.updatePositionFromRigidbody();
    this.updateViewVector();
    this.updateOrientationTarget();
    this.updateAirBro();
    this.updateMoveSpeed();
    this.updateMovementSpring(timeStep);
    this.updateRotationSpring(timeStep);
    this.updateModelRotation();
  }

  private updatePositionFromRigidbody() {
    if (!this.playerObjectReferences?.current?.rigidbody?.current) return;
    const { x, y, z } =
      this.playerObjectReferences.current.rigidbody.current.translation();
    this.position.set(x, y, z);
  }

  private updateMoveSpeed() {
    let targetSpeed = this.walkSpeed;

    if (input.SPRINT) {
      targetSpeed = this.runSpeed;
    }

    this.moveSpeed = MathUtils.lerp(this.moveSpeed, targetSpeed, 0.116);
  }

  falling = false;
  preJump = false;
  shouldJump = false;
  jumping = 0;
  updateAirBro() {
    const { x, y, z } =
      this.playerObjectReferences.current.rigidbody.current.translation();

    if (y !== 0 || y > 1) {
      this.playerObjectReferences.current.rigidbody.current.setTranslation(
        {
          x,
          y: 0,
          z,
        },
        true
      );
    }
  }

  updateMovementSpring(timeStep: number) {
    //* Simulator
    this.velocitySimulator.target.copy(this.arcadeVelocityTarget);
    this.velocitySimulator.simulate(timeStep);

    // Update values
    this.velocity.copy(this.velocitySimulator.position);
  }

  UP = new Vector3(0, 1, 0);
  updateRotationSpring(timeStep: number): void {
    //* Spring rotation
    //* Figure out angle between current and target orientation
    let angle = getSignedAngleBetweenVectors(
      this.orientation,
      this.orientationTarget
    );

    //* Simulator
    this.rotationSimulator.target = angle;
    this.rotationSimulator.simulate(timeStep * 1.74);
    let rot = this.rotationSimulator.position;

    //* Updating values
    this.orientation.applyAxisAngle(this.UP, rot);
    this.angularVelocity = this.rotationSimulator.velocity;
  }

  localMovementDirection = new Vector3();
  getLocalMovementDirection() {
    const positiveX = input.RIGHT ? -1 : 0;
    const negativeX = input.LEFT ? 1 : 0;
    const positiveZ = input.FORWARD ? 1 : 0;
    const negativeZ = input.BACKWARD ? -1 : 0;

    return this.localMovementDirection
      .set(positiveX + negativeX, 0, positiveZ + negativeZ)
      .normalize();
  }

  flatViewVector = new Vector3();
  cameraRelativeMovementVector = new Vector3();
  getCameraRelativeMovementVector() {
    this.flatViewVector
      .set(this.viewVector.x, 0, this.viewVector.z)
      .normalize();
    return applyVectorMatrixXZ(
      this.flatViewVector,
      this.getLocalMovementDirection(),
      this.cameraRelativeMovementVector
    );
  }

  updateOrientationTarget() {
    let moveVector = this.getCameraRelativeMovementVector();
    const noInputDirection =
      moveVector.x === 0 && moveVector.y === 0 && moveVector.z === 0;
    if (noInputDirection) {
      this.arcadeVelocityTarget.z = 0;
      this.setOrientation(this.orientation);
    } else {
      this.arcadeVelocityTarget.z = 1;
      this.setOrientation(moveVector);

      if (
        (input.RIGHT || input.LEFT) &&
        Math.abs(
          this.playerObjectReferences.current.modelRef.current.rotation.z
        ) < 0.003
      ) {
        this.playerObjectReferences.current.modelRef.current?.rotateZ(
          input.RIGHT ? 0.003 : -0.003
        );
      } else {
        this.playerObjectReferences.current.modelRef.current?.rotateZ(
          this.playerObjectReferences.current.modelRef.current.rotation.z * -1
        );
      }
    }
  }

  private rotationQuaternion = new Quaternion(0, Math.PI / 2, 0, 0);
  private rotationMatrix = new Matrix4();
  private zeroVec = new Vector3(0, 0, 0);
  private upVec = new Vector3(0, 1, 0);
  updateModelRotation() {
    this.rotationQuaternion.setFromRotationMatrix(
      this.rotationMatrix.lookAt(this.orientation, this.zeroVec, this.upVec)
    );

    this.playerObjectReferences.current.rigidbody.current?.setRotation(
      this.rotationQuaternion,
      false
    );
  }

  private simulatedVelocity = new Vector3();
  readonly arcadeVelocity = new Vector3();
  readonly combinedVelocity = new Vector3();
  physicsPostStep(worldApi: WorldApi) {
    if (!this.playerObjectReferences?.current?.rigidbody?.current) return;

    const pos =
      this.playerObjectReferences.current.rigidbody.current.translation();
    this.footShape.origin.x = pos.x;
    this.footShape.origin.y = pos.y;
    this.footShape.origin.z = pos.z;

    const grounded = true; //* Boolean(result && result.collider);
    if (this.grounded !== grounded) {
    }
    this.grounded = grounded;

    const velocity =
      this.playerObjectReferences.current.rigidbody.current.linvel();
    this.simulatedVelocity.set(velocity.x, velocity.y, velocity.z);

    //* Take local velocity
    this.arcadeVelocity.copy(this.velocity).multiplyScalar(this.moveSpeed);

    //* Turn local into global
    applyVectorMatrixXZ(
      this.orientation,
      this.arcadeVelocity,
      this.arcadeVelocity
    );

    if (this.jumping === 1) {
      this.jumping = 2;
    }
    if (this.shouldJump) {
      this.shouldJump = false;
      this.preJump = false;
      this.jumping = 1;
    }

    if (this.jumping || this.falling) {
      this.arcadeVelocityInfluence.set(0.116, 0, 0.116);
    } else {
      this.arcadeVelocityInfluence.set(1, 0, 1);
    }

    lerpVectors(
      this.simulatedVelocity,
      this.arcadeVelocity,
      this.arcadeVelocityInfluence,
      this.combinedVelocity
    );

    //* Limit Gravity
    this.combinedVelocity.y = Math.min(
      Math.max(this.combinedVelocity.y, this.gravityLimit),
      1
    );

    //* Apply velocity
    this.playerObjectReferences.current.rigidbody.current?.setLinvel(
      this.combinedVelocity,
      true
    );
  }
}

// Derived class HumanCharacter
export class HumanCharacter extends Character {
  protected get defaultVelocitySimulatorMass(): number {
    return 80;
  }

  protected get defaultVelocitySimulatorDamping(): number {
    return 0.7;
  }

  protected get defaultRotationSimulatorMass(): number {
    return 10;
  }

  protected get defaultRotationSimulatorDamping(): number {
    return 0.5;
  }

  protected get runSpeed(): number {
    return 10;
  }

  protected get walkSpeed(): number {
    return 7;
  }

  constructor(props: {
    orientation?: Vector3Tuple;
    camera: Camera;
    playerObjectReferences: PlayerObjectReferences;
  }) {
    super(props);
  }
}

// Derived class CarCharacter
