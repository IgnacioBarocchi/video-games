import {
  Camera,
  MathUtils,
  Matrix4,
  Quaternion,
  Vector3,
  Vector3Tuple,
} from "three";
import { Ray } from "@dimforge/rapier3d-compat";
import { RelativeSpringSimulator } from "physics";
import { VectorSpringSimulator } from "physics";
import { ObjectRef, RigidBodyRef } from "../types";
import {
  applyVectorMatrixXZ,
  calculateIntensity,
  getFrequencyRangeData,
  getSignedAngleBetweenVectors,
  lerpVectors,
} from "./helpers";
import { input } from "./input";
import { MutableRefObject } from "react";
import { AttachmentReferences, PlayerObjectReferences } from ".";
import { GLTFActions } from "./model";

const useMusic = false;

// const drivingOnSnowAudio = new Audio(drivingOnSnow);
// drivingOnSnowAudio.volume = 0.2;
// drivingOnSnowAudio.loop = true;

// const runSpeed = 30; //
// const walkSpeed = 20; //100km

const runSpeed = 100;
const walkSpeed = 20;
// const runSpeed = 500;
// const walkSpeed = 100;
const jumpSpeed = 10;

export class Character {
  velocity = new Vector3();
  arcadeVelocityInfluence = new Vector3(1, 0, 1);
  arcadeVelocityTarget = new Vector3();
  velocitySimulator: VectorSpringSimulator;
  rotationSimulator: RelativeSpringSimulator;

  defaultVelocitySimulatorMass = 1000;
  defaultVelocitySimulatorDamping = 0.9;
  defaultRotationSimulatorMass = 200;
  defaultRotationSimulatorDamping = 0.6;
  grounded = false;
  footShape = new Ray({ x: 0, y: 0, z: 0 }, { x: 0, y: -1, z: 0 });
  gravityLimit = -30;
  moveSpeed = 0;
  angularVelocity = 0;
  orientation = new Vector3(0, 0, 1);
  orientationTarget = new Vector3(0, 0, 1);
  viewVector = new Vector3();
  analyser;
  attachmentReferences;
  // actions: GLTFActions;
  readonly position = new Vector3();
  public previousDrivingState = "STOP";
  public drivingState = "STOP";
  public playerObjectReferences: PlayerObjectReferences;
  // public rigidbody: RigidBodyRef;
  // private model: ObjectRef;
  private camera: Camera;

  constructor(props: {
    orientation?: Vector3Tuple;
    // rigidbody: RigidBodyRef;
    // model: ObjectRef;
    camera: Camera;
    playerObjectReferences: PlayerObjectReferences;
    attachmentReferences: AttachmentReferences;
    // actions: GLTFActions;
  }) {
    // this.actions = props.actions;
    this.playerObjectReferences = props.playerObjectReferences;
    this.playerObjectReferences.current?.rigidbody?.current?.setAdditionalMassProperties(
      1500,
      new Vector3(0, 0, 6),
      new Vector3(0, 0, 0),
      new Quaternion(0, 0, 0, 0),
      true
    );

    this.camera = props.camera;
    // this.model = props.model;
    this.attachmentReferences = props.attachmentReferences;
    if (useMusic) {
      this.analyser =
        props.attachmentReferences.current.audio.music.current?.context.createAnalyser();
    }
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

  setArcadeVelocityInfluence(x: number, y: number = x, z: number = x): void {
    this.arcadeVelocityInfluence.set(x, y, z);
  }

  setViewVector(vector: THREE.Vector3): void {
    this.viewVector.copy(vector).normalize();
  }

  lookVector = new Vector3();
  setOrientation(vector: THREE.Vector3): void {
    this.lookVector.copy(vector).setY(0).normalize();
    this.orientationTarget.copy(this.lookVector);
  }

  updateViewVector() {
    this.viewVector.subVectors(this.position, this.camera.position);
  }

  update(timeStep: number) {
    // console.log(this.playerObjectReferences.current);
    this.updatePositionFromRigidbody();
    this.updateViewVector();
    this.updateOrientationTarget();
    // this.updateAirBro();
    this.updateMoveSpeed();
    this.updateMovementSpring(timeStep);
    this.updateRotationSpring(timeStep);
    this.updateModelRotation();
    this.updateAttachments();
    // this.updateModelAnimations();
  }

  private updatePositionFromRigidbody() {
    if (!this.playerObjectReferences.current?.rigidbody?.current) return;
    // console.log(this.onSnow.current);
    const { x, y, z } =
      this.playerObjectReferences.current.rigidbody.current.translation();
    this.position.set(x, y, z);
  }

  private updateMoveSpeed() {
    let targetSpeed = walkSpeed;

    // if (this.jumping || this.falling) {
    //   targetSpeed = this.moveSpeed;
    // } else

    if (input.SPRINT) {
      targetSpeed = runSpeed;
    }

    this.moveSpeed = MathUtils.lerp(this.moveSpeed, targetSpeed, 0.116);
    // clamp velocity in Y axis from 1 to 0.
  }

  falling = false;
  preJump = false;
  shouldJump = false;
  jumping = 0;
  updateAirBro() {
    if (!this.playerObjectReferences.current?.rigidbody?.current) return;

    const currentY =
      this.playerObjectReferences.current.rigidbody.current.linvel().y;
    const isFalling = currentY < -3.16;

    if (this.jumping === 2 && this.falling && !isFalling) {
      this.jumping = 0;
    }

    if (this.falling !== isFalling) {
      console.log(isFalling ? "Falling" : "Landed");
    }
    this.falling = isFalling;

    if (input.JUMP && !this.jumping && !this.falling) {
      this.preJump = true;
    }

    if (!this.jumping && !this.falling && this.preJump && !input.JUMP) {
      this.shouldJump = true;
    }
  }

  updateMovementSpring(timeStep: number) {
    // Simulator
    this.velocitySimulator.target.copy(this.arcadeVelocityTarget);
    this.velocitySimulator.simulate(timeStep);

    // Update values
    this.velocity.copy(this.velocitySimulator.position);
  }

  UP = new Vector3(0, 1, 0);
  updateRotationSpring(timeStep: number): void {
    // Spring rotation
    // Figure out angle between current and target orientation
    let angle = getSignedAngleBetweenVectors(
      this.orientation,
      this.orientationTarget
    );

    // Simulator
    this.rotationSimulator.target = angle;
    this.rotationSimulator.simulate(timeStep * 1.74);
    let rot = this.rotationSimulator.position;

    // Updating values
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

  private rotationQuaternion = new Quaternion();
  private rotationMatrix = new Matrix4();
  private zeroVec = new Vector3(0, 0, 0);
  private upVec = new Vector3(0, 1, 0);
  updateModelRotation() {
    this.rotationQuaternion.setFromRotationMatrix(
      this.rotationMatrix.lookAt(this.orientation, this.zeroVec, this.upVec)
    );

    // console.log(this.rotationQuaternion.w);
    this.playerObjectReferences.current.rigidbody.current?.setRotation(
      this.rotationQuaternion,
      false
    );
    // const w = Number(this.rotationQuaternion.w.toFixed(1));

    // if (Math.abs(w) === 0.1) {
    //   //&& this.playerObjectReferences.current.modelRef.current.rotation.z === 0) {
    //   this.playerObjectReferences.current.modelRef.current?.rotateZ(
    //     w,
    //     // w > 0 ? Math.PI / 2 : w < 0 ? -Math.PI / 2 : 0,
    //   );
    //   this.playerObjectReferences.current.modelRef.current?.rotateZ(0);
    // } else {
    //   this.playerObjectReferences.current.modelRef.current?.rotateZ(0);
    // }
  }

  private simulatedVelocity = new Vector3();
  readonly arcadeVelocity = new Vector3();
  readonly combinedVelocity = new Vector3();
  physicsPostStep(worldApi: WorldApi) {
    // if (!worldApi) {
    //   return;
    // }

    if (!this.playerObjectReferences.current?.rigidbody?.current) return;

    // Update foot ray position
    const pos =
      this.playerObjectReferences.current.rigidbody.current.translation();
    this.footShape.origin.x = pos.x;
    this.footShape.origin.y = pos.y;
    this.footShape.origin.z = pos.z;

    // TODO: work on grounded logic
    // const world = worldApi?.raw();
    // const result = world.castRay(
    //   this.footShape,
    //   1.16 / 2 + 0.316,
    //   true,
    //   undefined,
    //   undefined,
    //   undefined,
    //   this.playerObjectReferences.current.rigidbody.current,
    // );
    const grounded = true; //Boolean(result && result.collider);
    if (this.grounded !== grounded) {
      console.log(grounded ? "Grounded" : "Not Grounded");
    }
    this.grounded = grounded;

    const velocity =
      this.playerObjectReferences.current.rigidbody.current.linvel();
    this.simulatedVelocity.set(velocity.x, velocity.y, velocity.z);

    // Take local velocity
    this.arcadeVelocity.copy(this.velocity).multiplyScalar(this.moveSpeed);

    // Turn local into global
    applyVectorMatrixXZ(
      this.orientation,
      this.arcadeVelocity,
      this.arcadeVelocity
    );

    if (this.jumping === 1) {
      this.simulatedVelocity.y += jumpSpeed;
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

    // Limit Gravity
    this.combinedVelocity.y = Math.min(
      Math.max(this.combinedVelocity.y, this.gravityLimit),
      1
    );

    // Apply velocity
    this.playerObjectReferences.current.rigidbody.current?.setLinvel(
      this.combinedVelocity,
      true
    );

    // const temp = this.drivingState;

    // if (Math.abs(this.combinedVelocity.z) < 3) {
    //   this.drivingState = 'STOP';
    // } else if (this.combinedVelocity.x > 5 && this.combinedVelocity.x > 0) {
    //   this.drivingState = 'TURN RIGHT';
    //   if (this.combinedVelocity.x > 20) {
    //     this.drivingState = 'SWUNG RIGHT';
    //   }
    // } else if (this.combinedVelocity.x < -5 && this.combinedVelocity.x < 0) {
    //   this.drivingState = 'TURN LEFT';
    //   if (this.combinedVelocity.x < -20) {
    //     this.drivingState = 'SWUNG LEFT';
    //   }
    // } else {
    //   this.drivingState = 'STRAIGHT';
    // }

    // if (temp !== this.drivingState) {
    //   this.previousDrivingState = temp;
    // }

    // console.log(this.playerObjectReferences.current.rigidbody.current?.mass);
    // console.log(
    //   this.playerObjectReferences.current.rigidbody.current?.centerOfMass,
    // );
    // console.log(
    //   this.playerObjectReferences.current.rigidbody.current
    //     ?.principalAngularInertia,
    // );
    // console.log(
    //   this.playerObjectReferences.current.rigidbody.current
    //     ?.angularInertiaLocalFrame,
    // );
  }

  updateAttachments() {
    if (
      !this.playerObjectReferences.current.rigidbody.current ||
      !this.attachmentReferences.current
    ) {
      return;
    }

    const carSpeed = Number(
      Math.abs(
        this.playerObjectReferences.current.rigidbody.current.linvel().z
      ).toFixed(2)
    );

    const { audio, lights, isOnSnow } = this.attachmentReferences.current;
    const volume = Number(carSpeed);
    audio.carEngine.current!.setVolume(volume);
    audio.drivingOnSurface.current!.setVolume(
      isOnSnow?.current ? volume : volume / 3
    );

    // lights.leftStopLight.current!.intensity = calculateIntensity(carSpeed);
    // lights.rightStopLight.current!.intensity = calculateIntensity(carSpeed);
    if (!useMusic) {
      return;
    }
    // const data = audio.analyser.current.getFrequencyData();
    // const bassPower = getFrequencyRangeData(audio.music, data, 20, 250);
    // const highPower = getFrequencyRangeData(audio.music, data, 1000, 5000);
    // const contrastIntensity = bassPower - highPower;
    // lights.bottomLight.current!.intensity = 0; // contrastIntensity;
  }

  // updateModelAnimations() {
  //   if (this.drivingState !== 'STOP') {
  //     this.actions.Driving_wheel_FR.play();
  //     this.actions.Driving_wheel_BR.play();
  //     this.actions.Driving_wheel_FL.play();
  //     this.actions.Driving_wheel_BL.play();
  //   } else {
  //     this.actions.Driving_wheel_FR.stop();
  //     this.actions.Driving_wheel_BR.stop();
  //     this.actions.Driving_wheel_FL.stop();
  //     this.actions.Driving_wheel_BL.stop();
  //   }

  //   if (
  //     !this.actions.FR_Wheel_Turn_L.isRunning() ||
  //     !this.actions.FR_Wheel_Turn_R.isRunning() ||
  //     !this.actions.Backlights_Turn_L.isRunning() ||
  //     !this.actions.Backlights_Turn_R.isRunning()
  //   ) {
  //     return;
  //   }

  //   const shouldSwungLeft =
  //     this.drivingState === 'SWUNG LEFT' &&
  //     !['SWUNG LEFT'].includes(this.previousDrivingState);

  //   const shouldSwungRight =
  //     this.drivingState === 'SWUNG RIGHT' &&
  //     !['SWUNG RIGHT'].includes(this.previousDrivingState);

  //   if (shouldSwungLeft) {
  //     console.log('shouldSwungLeft');
  //     this.actions.FL_Wheel_Turn_L.setLoop(LoopOnce, 1);
  //     this.actions.FL_Wheel_Turn_L.clampWhenFinished = true;
  //     this.actions.FL_Wheel_Turn_L.enabled = true;
  //     this.actions.FL_Wheel_Turn_L.play();

  //     this.actions.FR_Wheel_Turn_L.setLoop(LoopOnce, 1);
  //     this.actions.FR_Wheel_Turn_L.clampWhenFinished = true;
  //     this.actions.FR_Wheel_Turn_L.enabled = true;
  //     this.actions.FR_Wheel_Turn_L.play();

  //     this.actions.Exterior_Turn_L.setLoop(LoopOnce, 1);
  //     this.actions.Exterior_Turn_L.clampWhenFinished = true;
  //     this.actions.Exterior_Turn_L.enabled = true;
  //     this.actions.Exterior_Turn_L.reset().fadeIn(0.2).play();

  //     this.actions.Backlights_Turn_L.setLoop(LoopOnce, 1);
  //     this.actions.Backlights_Turn_L.clampWhenFinished = true;
  //     this.actions.Backlights_Turn_L.enabled = true;
  //     this.actions.Backlights_Turn_L.reset().fadeIn(0.2).play();
  //   }

  //   if (shouldSwungRight) {
  //     console.log('shouldSwungRight');
  //     this.actions.FL_Wheel_Turn_R.setLoop(LoopOnce, 1);
  //     this.actions.FL_Wheel_Turn_R.clampWhenFinished = true;
  //     this.actions.FL_Wheel_Turn_R.enabled = true;
  //     this.actions.FL_Wheel_Turn_R.play();

  //     this.actions.FR_Wheel_Turn_R.setLoop(LoopOnce, 1);
  //     this.actions.FR_Wheel_Turn_R.clampWhenFinished = true;
  //     this.actions.FR_Wheel_Turn_R.enabled = true;
  //     this.actions.FR_Wheel_Turn_R.play();

  //     this.actions.Exterior_Turn_R.setLoop(LoopOnce, 1);
  //     this.actions.Exterior_Turn_R.clampWhenFinished = true;
  //     this.actions.Exterior_Turn_R.enabled = true;
  //     this.actions.Exterior_Turn_R.reset().fadeIn(0.2).play();

  //     this.actions.Backlights_Turn_R.setLoop(LoopOnce, 1);
  //     this.actions.Backlights_Turn_R.clampWhenFinished = true;
  //     this.actions.Backlights_Turn_R.enabled = true;
  //     this.actions.Backlights_Turn_R.reset().fadeIn(0.2).play();
  //   }

  //   // if (shouldTurnLeft) {
  //   //   console.log('shouldTurnLeft');
  //   //   this.actions.FL_Wheel_Turn_L.setLoop(LoopOnce, 1);
  //   //   this.actions.FL_Wheel_Turn_L.clampWhenFinished = true;
  //   //   this.actions.FL_Wheel_Turn_L.enabled = true;
  //   //   this.actions.FL_Wheel_Turn_L.play();

  //   //   this.actions.FR_Wheel_Turn_L.setLoop(LoopOnce, 1);
  //   //   this.actions.FR_Wheel_Turn_L.clampWhenFinished = true;
  //   //   this.actions.FR_Wheel_Turn_L.enabled = true;
  //   //   this.actions.FR_Wheel_Turn_L.play();
  //   // }

  //   // if (shouldTurnRight) {
  //   //   console.log('shouldTurnRight');
  //   //   this.actions.FL_Wheel_Turn_R.setLoop(LoopOnce, 1);
  //   //   this.actions.FL_Wheel_Turn_R.clampWhenFinished = true;
  //   //   this.actions.FL_Wheel_Turn_R.enabled = true;
  //   //   this.actions.FL_Wheel_Turn_R.play();

  //   //   this.actions.FR_Wheel_Turn_R.setLoop(LoopOnce, 1);
  //   //   this.actions.FR_Wheel_Turn_R.clampWhenFinished = true;
  //   //   this.actions.FR_Wheel_Turn_R.enabled = true;
  //   //   this.actions.FR_Wheel_Turn_R.play();
  //   // }
  // }
}

// defaultVelocitySimulatorMass = 44;
// defaultVelocitySimulatorDamping = 0.74;
// defaultRotationSimulatorMass = 4.4;
// defaultRotationSimulatorDamping = 0.44;
// updateModelAnimations() {
//   // console.log('P', this.previousDrivingState);
//   // console.log('C', this.drivingState);
//   if (this.drivingState !== 'STOP') {
//     this.actions.Driving_wheel_FR.play();
//     this.actions.Driving_wheel_BR.play();
//     this.actions.Driving_wheel_FL.play();
//     this.actions.Driving_wheel_BL.play();
//   } else {
//     this.actions.Driving_wheel_FR.stop();
//     this.actions.Driving_wheel_BR.stop();
//     this.actions.Driving_wheel_FL.stop();
//     this.actions.Driving_wheel_BL.stop();

//   }

//   const shouldTurnLeft =
//     this.drivingState === 'TURN LEFT' &&
//     !['TURN LEFT', 'SWUNG LEFT'].includes(this.previousDrivingState);

//   const shouldTurnRight =
//     this.drivingState === 'TURN RIGHT' &&
//     !['TURN RIGHT', 'SWUNG RIGHT'].includes(this.previousDrivingState);

//   const shouldSwungLeft =
//     this.drivingState === 'SWUNG LEFT' &&
//     !['TURN LEFT', 'SWUNG LEFT'].includes(this.previousDrivingState);

//   const shouldSwungRight =
//     this.drivingState === 'SWUNG RIGHT' &&
//     !['TURN RIGHT', 'SWUNG RIGHT'].includes(this.previousDrivingState);

//   console.table({
//     shouldTurnLeft,
//     shouldTurnRight,
//     shouldSwungLeft,
//     shouldSwungRight,
//   });

//   if (shouldTurnLeft) {
//     this.actions.FL_Wheel_Turn_L.setLoop(LoopOnce, 1);
//     this.actions.FL_Wheel_Turn_L.clampWhenFinished = true;
//     this.actions.FL_Wheel_Turn_L.enabled = true;
//     this.actions.FL_Wheel_Turn_L.play();

//     this.actions.FR_Wheel_Turn_L.setLoop(LoopOnce, 1);
//     this.actions.FR_Wheel_Turn_L.clampWhenFinished = true;
//     this.actions.FR_Wheel_Turn_L.enabled = true;
//     this.actions.FR_Wheel_Turn_L.play();
//   }

//   if (shouldTurnRight) {
//     this.actions.FL_Wheel_Turn_R.setLoop(LoopOnce, 1);
//     this.actions.FL_Wheel_Turn_R.clampWhenFinished = true;
//     this.actions.FL_Wheel_Turn_R.enabled = true;
//     this.actions.FL_Wheel_Turn_R.play();

//     this.actions.FR_Wheel_Turn_R.setLoop(LoopOnce, 1);
//     this.actions.FR_Wheel_Turn_R.clampWhenFinished = true;
//     this.actions.FR_Wheel_Turn_R.enabled = true;
//     this.actions.FR_Wheel_Turn_R.play();
//   }

//   if (shouldSwungLeft) {
//     this.actions.FL_Wheel_Turn_L.setLoop(LoopOnce, 1);
//     this.actions.FL_Wheel_Turn_L.clampWhenFinished = true;
//     this.actions.FL_Wheel_Turn_L.enabled = true;
//     this.actions.FL_Wheel_Turn_L.play();

//     this.actions.FR_Wheel_Turn_L.setLoop(LoopOnce, 1);
//     this.actions.FR_Wheel_Turn_L.clampWhenFinished = true;
//     this.actions.FR_Wheel_Turn_L.enabled = true;
//     this.actions.FR_Wheel_Turn_L.play();

//     this.actions.Exterior_Turn_L.setLoop(LoopOnce, 1);
//     this.actions.Exterior_Turn_L.clampWhenFinished = true;
//     this.actions.Exterior_Turn_L.enabled = true;
//     this.actions.Exterior_Turn_L.reset().fadeIn(0.2).play();

//     this.actions.Backlights_Turn_L.setLoop(LoopOnce, 1);
//     this.actions.Backlights_Turn_L.clampWhenFinished = true;
//     this.actions.Backlights_Turn_L.enabled = true;
//     this.actions.Backlights_Turn_L.reset().fadeIn(0.2).play();
//   }

//   if (shouldSwungRight) {
//     this.actions.FL_Wheel_Turn_R.setLoop(LoopOnce, 1);
//     this.actions.FL_Wheel_Turn_R.clampWhenFinished = true;
//     this.actions.FL_Wheel_Turn_R.enabled = true;
//     this.actions.FL_Wheel_Turn_R.play();

//     this.actions.FR_Wheel_Turn_R.setLoop(LoopOnce, 1);
//     this.actions.FR_Wheel_Turn_R.clampWhenFinished = true;
//     this.actions.FR_Wheel_Turn_R.enabled = true;
//     this.actions.FR_Wheel_Turn_R.play();

//     this.actions.Exterior_Turn_R.setLoop(LoopOnce, 1);
//     this.actions.Exterior_Turn_R.clampWhenFinished = true;
//     this.actions.Exterior_Turn_R.enabled = true;
//     this.actions.Exterior_Turn_R.reset().fadeIn(0.2).play();

//     this.actions.Backlights_Turn_R.setLoop(LoopOnce, 1);
//     this.actions.Backlights_Turn_R.clampWhenFinished = true;
//     this.actions.Backlights_Turn_R.enabled = true;
//     this.actions.Backlights_Turn_R.reset().fadeIn(0.2).play();
//   }
// }
// const shouldTurnLeft =
//   this.drivingState === 'TURN LEFT' &&
//   !['TURN LEFT', 'SWUNG LEFT'].includes(this.previousDrivingState); // &&
// //  &&

// const shouldTurnRight =
//   this.drivingState === 'TURN RIGHT' &&
//   !['TURN RIGHT', 'SWUNG RIGHT'].includes(this.previousDrivingState); //&&
