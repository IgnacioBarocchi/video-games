import { CustomCanvas } from "../custom-canvas";
import { Tux3DModel } from "./Tux3DModel";

export const TuxScene = () => {
  return (
    <CustomCanvas>
      <Tux3DModel />
    </CustomCanvas>
  );
};
