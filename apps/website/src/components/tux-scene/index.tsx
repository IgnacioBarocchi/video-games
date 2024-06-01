import { Text } from "@react-three/drei";
import { CustomCanvas } from "../custom-canvas";
import { Tux3DModel } from "./Tux3DModel";

export const TuxScene = () => {
  return (
    <CustomCanvas>
      {/* <Text position={[0, 0, -1]}>para linux</Text> */}
      <Tux3DModel />
    </CustomCanvas>
  );
};
