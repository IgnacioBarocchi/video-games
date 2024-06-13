import { Object3D, PerspectiveCamera, Vector2, Vector3 } from "three";
import { CRASH_STATE } from "../machines/machine-constants";

const shakeCamershakeCameraParams = {
  maxYaw: 0.2, // Maximum rotation on the Y axis (yaw)
  maxPitch: 0.1, // Maximum rotation on the X axis (pitch)
  maxRoll: 0.3, // Maximum rotation on the Z axis (roll)
  yawFrequency: 10, // Frequency of yaw oscillation
  pitchFrequency: 8, // Frequency of pitch oscillation
  rollFrequency: 12, // Frequency of roll oscillation
  decay: 0.9, // Decay factor for shake intensity over time
};

export class CarThirdPersonCamera {
  camera: PerspectiveCamera;
  target: Vector3;
  direction: Vector3;
  sensitivity: Vector2;
  radius: number;
  theta: number;
  phi: number;
  actorRef;

  isShaking: boolean = false;
  shakeOffset: Vector3 = new Vector3(0, 0, 0);
  shakeTime: number = 0;

  constructor({
    camera,
    sensitivityX = 0.16,
    sensitivityY = sensitivityX * 0.74,
    phi = 0,
    theta = 0,
    normalRadius = 6,
    actorRef,
  }: {
    camera: PerspectiveCamera;
    sensitivityX?: number;
    sensitivityY?: number;
    phi?: number;
    theta?: number;
    normalRadius?: number;
    actorRef;
  }) {
    this.camera = camera;

    this.sensitivity = new Vector2(sensitivityX, sensitivityY);
    this.theta = theta;
    this.phi = phi;
    this.target = new Vector3();
    this.direction = new Vector3();
    this.radius = normalRadius;
    this.actorRef = actorRef;
  }

  move(deltaX: number, deltaY: number) {
    this.theta -= deltaX * (this.sensitivity.x / 2);
    this.theta %= 360;
    this.phi += deltaY * (this.sensitivity.y / 2);
    this.phi = Math.min(74, Math.max(-28, this.phi));
  }

  update(target: Object3D) {
    if (
      this.actorRef?.getSnapshot()?.value === CRASH_STATE &&
      !this.isShaking
    ) {
      this.isShaking = true;
      this.shakeTime = 0;
    } else {
      this.isShaking = false;
    }

    target.getWorldPosition(this.target);
    this.target.y += 2.5;
    this.target.z += 1;

    if (this.isShaking) {
      this.updateShake();
    }

    this.updateCameraPosition();
    this.camera.updateMatrix();
    // this.camera.lookAt(this.target);
    this.camera.lookAt(this.target.addVectors(this.target, this.shakeOffset));
    this.direction.subVectors(this.target, this.camera.position).normalize();
  }

  private updateCameraPosition() {
    const theta = (this.theta * Math.PI) / 180;
    const phi = (this.phi * Math.PI) / 180;

    const x = this.target.x + this.radius * Math.sin(theta) * Math.cos(phi);
    const y = this.target.y + this.radius * Math.sin(phi);
    const z = this.target.z + this.radius * Math.cos(theta) * Math.cos(phi);
    this.camera.position.x = x;
    this.camera.position.y = y;
    this.camera.position.z = z + 15;
  }

  private updateShake() {
    this.shakeTime += Math.random();

    // Generate random offsets based on frequencies and maximum values
    const yawOffset =
      Math.sin(this.shakeTime * shakeCamershakeCameraParams.yawFrequency) *
      shakeCamershakeCameraParams.maxYaw;
    const pitchOffset =
      Math.cos(this.shakeTime * shakeCamershakeCameraParams.pitchFrequency) *
      shakeCamershakeCameraParams.maxPitch;
    const rollOffset =
      Math.sin(this.shakeTime * shakeCamershakeCameraParams.rollFrequency) *
      shakeCamershakeCameraParams.maxRoll;

    // Apply offsets to shake vector
    this.shakeOffset.set(yawOffset, pitchOffset, rollOffset);

    // Decay shake intensity over time
    this.shakeOffset.multiplyScalar(shakeCamershakeCameraParams.decay);

    // Stop shaking if intensity falls below a threshold
    if (this.shakeOffset.length() < 0.01) {
      this.isShaking = false;
      this.shakeOffset.set(0, 0, 0);
    }
  }
}
