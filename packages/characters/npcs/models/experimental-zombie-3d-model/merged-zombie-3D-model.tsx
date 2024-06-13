import { Detailed } from "@react-three/drei";
import { Zombie3DLowResModel } from "./zombie-3D-model-low-res";
import { Zombie3DModelSDRes } from "./zombie-3D-model-sd-res";
import { MutableRefObject, forwardRef } from "react";
import { Group } from "three";

export const MergedZombie3DModel = forwardRef<{
  props: JSX.IntrinsicElements["group"];
  group: MutableRefObject<Group>;
}>((props, group) => {
  // return (
  //   <Zombie3DLowResModel
  //     ref={group}
  //     nodes={props.nodes}
  //     materials={props.materials}
  //   />
  // );

  return (
    <Detailed distances={[10, 50]}>
      <Zombie3DLowResModel
        ref={group}
        nodes={props.nodes}
        materials={props.materials}
      />
      <Zombie3DModelSDRes
        ref={group}
        nodes={props.nodes}
        materials={props.materials}
      />
    </Detailed>
  );
});
