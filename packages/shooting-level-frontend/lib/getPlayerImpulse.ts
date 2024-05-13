import { Keys } from './keysMap';

export default function getPlayerImpulse(
  keys: Keys,
  delta: number,
  scaler: number = 20,
) {
  const numberOfKeysPressed = Object.values(keys).filter((key) => key).length;

  let { forward, backward, leftward, rightward } = keys;
  const speed = 6 * scaler;
  // * Reduce speed value if it's diagonal movement to always keep the same speed
  const normalizedSpeed =
    numberOfKeysPressed == 1
      ? speed * delta
      : Math.sqrt(2) * (speed / 2) * delta;

  if (forward && backward && numberOfKeysPressed === 2) forward = false;

  if (leftward && rightward && numberOfKeysPressed === 2) leftward = false;

  let impulse = {
    x: leftward ? -normalizedSpeed : rightward ? normalizedSpeed : 0,
    y: 0,
    z: forward ? -normalizedSpeed : backward ? normalizedSpeed : 0,
  };

  return impulse;
}

// export default function getImpulseRoll(
//     numberOfKeysPressed: number,
//     delta: number,
//     scaler: number = 20
// ) {
//     const speed = 6 * scaler;
//     // * Reduce speed value if it's diagonal movement to always keep the same speed
//     const normalizedSpeed =
//         numberOfKeysPressed == 1
//             ? speed * delta
//             : Math.sqrt(2) * (speed / 2) * delta;

//     if (forward && backward && numberOfKeysPressed === 2) forward = false;

//     if (leftward && rightward && numberOfKeysPressed === 2) leftward = false;

//     let impulse = {
//         x: leftward ? -normalizedSpeed : rightward ? normalizedSpeed : 0,
//         y: 0,
//         z: forward ? -normalizedSpeed : backward ? normalizedSpeed : 0,
//     };

//     return impulse;
// }
