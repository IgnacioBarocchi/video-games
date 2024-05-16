import { MutableRefObject } from 'react';
import { GLTFActions } from './model';
import { RapierRigidBody } from '@react-three/rapier';

export class Animator {
  actions: GLTFActions;
  setCarDrivingState: Function;
  rigidbody: MutableRefObject<RapierRigidBody>;

  constructor(props: {
    actions: GLTFActions;
    rigidbody: MutableRefObject<RapierRigidBody>;
    setCarDrivingState: Function;
  }) {
    this.rigidbody = props.rigidbody;
    this.setCarDrivingState = props.setCarDrivingState;
    this.actions = props.actions;
  }

  watchCarMovement() {
    if (!this.rigidbody?.current) {
      return;
    }

    const zVelocity = this.rigidbody?.current.linvel().z ?? 0;
    const xVelocity = this.rigidbody?.current.linvel().x ?? 0;

    // const temp = this.drivingState;

    if (Math.abs(zVelocity) < 3) {
      this.setCarDrivingState('STOP');
    } else if (xVelocity > 5 && xVelocity > 0) {
      this.setCarDrivingState('TURN RIGHT');
      if (xVelocity > 20) {
        this.setCarDrivingState('SWUNG RIGHT');
      }
    } else if (xVelocity < -5 && xVelocity < 0) {
      this.setCarDrivingState('TURN LEFT');
      if (xVelocity < -20) {
        this.setCarDrivingState('SWUNG LEFT');
      }
    } else {
      this.setCarDrivingState('STRAIGHT');
    }

    // if (temp !== this.drivingState) {
    //   this.previousDrivingState = temp;
    // }
  }
}
