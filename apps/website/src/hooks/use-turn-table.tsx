import { GroupProps, useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const useTurnTable = () => {
  const group = useRef<GroupProps>();

  useFrame((rootState, delta) => {
    if (!group.current) {
      return;
    }
    group.current.rotation.y += delta * 0.5;
    // const target = group.current
    //   .getWorldPosition(group.current.position)
    //   .addVectors(new Vector3(0, 1, 0));

    // rootState.camera.updateMatrix();
    // if (!target) {
    //   return;
    // }

    // rootState.camera.lookAt(target);
  });

  return { group };
};
