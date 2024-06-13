import { Colors, CAMERA_FAR } from "game-constants";
import { Rain } from "../../../terrain/rain";

export const Environment = () => {
  // play sound once
  return (
    <>
      <Rain />
      <fog attach="fog" args={[Colors.richBlack, 5, CAMERA_FAR]} />
      <color attach="background" args={[Colors.richBlack]} />
    </>
  );
};
