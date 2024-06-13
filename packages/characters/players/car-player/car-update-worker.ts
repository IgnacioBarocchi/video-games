import { MathUtils } from "three";
import { deepStringsToFunctions } from "./deep-functions";

self.onmessage = (event) => {
  // const { character, cameraOperator, delta, playerObjectReferences, audioRef } =

  const { obj, objFunctionPaths } = event.data;
  deepStringsToFunctions(obj, objFunctionPaths);

  // Perform heavy calculations here (replace with your actual logic)
  const characterUpdateResult = character.update(delta, 60);
  const cameraUpdateResult = cameraOperator.update(
    playerObjectReferences?.modelRef?.current
  );
  const carSpeed = playerObjectReferences?.rigidbody?.current?.linvel().z || 0;
  const volume = MathUtils.clamp(Math.abs(carSpeed).toFixed(2), 0, 20);
  audioRef.current!.setVolume(volume);
  // Send the results back to the main thread
  self.postMessage({ characterUpdateResult, cameraUpdateResult, volume });
};
