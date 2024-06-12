import { Camera, Vector3Tuple } from "three";
import { Character } from "./@CharacterABS";
import { PlayerObjectReferences } from "../../players/car-player/car-player";

const props = {
  mass: 1500,
  velocityDimmer: 0.9,
  rotationMass: 200,
  rotationDimmer: 0.6,
  maxSpeed: 260,
  normalSpeed: 40,
};

export class CarCharacter extends Character {
  protected get defaultVelocitySimulatorMass(): number {
    return props.mass;
  }

  protected get defaultVelocitySimulatorDamping(): number {
    return props.velocityDimmer;
  }

  protected get defaultRotationSimulatorMass(): number {
    return props.rotationMass;
  }

  protected get defaultRotationSimulatorDamping(): number {
    return props.rotationDimmer;
  }

  protected get runSpeed(): number {
    return props.maxSpeed;
  }

  protected get walkSpeed(): number {
    return props.normalSpeed;
  }

  constructor(props: {
    orientation?: Vector3Tuple;
    camera: Camera;
    playerObjectReferences: PlayerObjectReferences;
  }) {
    super(props);
  }
}
