import { RootState } from "@react-three/fiber";
import { Group, Object3D, Object3DEventMap, Vector3 } from "three";

export const avdCameraLookAt = (params: {
  rootState: RootState;
  mesh: Group<Object3DEventMap> | null;
  position: Vector3;
}) => {
  const { rootState, mesh, position } = params;
  rootState.camera.position.set(0, 2, -2);

  if (!mesh) {
    console.log("no mesh");
  }

  console.log(position);
  const goal = new Object3D();
  goal.position.set(0, 2, -2);
  const temp = new Vector3();
  mesh?.add(goal);
  temp.setFromMatrixPosition(goal.matrixWorld);
  rootState.camera.position.lerp(position.add(temp), 0.2);
  rootState.camera.lookAt(position);
};

export const cameraLookAt = (params: {
  rootState: RootState;
  position: Vector3;
  rotation: Vector3;
  mode: "ARPG" | "3rd Person";
}) => {
  const { position, rotation, rootState, mode = "3rd Person" } = params;

  let cameraPosition = new Vector3();
  let cameraTarget = new Vector3();

  if (mode === "3rd Person") {
    const distance = 4; //3; //10; //5; //10;
    const angle = Math.PI / 3;

    const offset = new Vector3(
      distance * Math.cos(rotation.y + angle),
      3, //5,
      distance * Math.sin(rotation.y + angle)
    );

    cameraPosition.copy(position).add(offset);
    cameraTarget.copy(position);

    rootState.camera.position.lerp(cameraPosition, 0.5);
    rootState.camera.lookAt(cameraTarget);
  } else if (mode === "ARPG") {
    const fixedOffset = new Vector3(0, 10, 10);
    const rotatedOffset = fixedOffset
      .clone()
      .applyAxisAngle(new Vector3(0, 1, 0), rotation.y);

    cameraPosition.copy(position).add(rotatedOffset);
    cameraTarget.copy(position);

    rootState.camera.position.copy(cameraPosition);
    rootState.camera.lookAt(cameraTarget);
  } else {
    console.error(`Unsupported camera mode: ${mode}`);
  }
};
