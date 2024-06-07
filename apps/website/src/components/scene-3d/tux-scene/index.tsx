import { CustomCanvas } from "../custom-canvas";
import { Tux3DModel } from "./Tux3DModel";

export const TuxScene = () => {
  return (
    // <Layer settings={{ speed: -0.3, type: "translateX" }}>
    <CustomCanvas>
      <Tux3DModel />
    </CustomCanvas>
    // </Layer>
  );
};
