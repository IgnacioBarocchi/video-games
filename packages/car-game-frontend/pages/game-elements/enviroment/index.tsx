import { register } from "react-worker-components";
import { Colors, CAMERA_FAR } from "game-constants";
import { Rain } from "../../../terrain/rain";
import { DeferredComponent } from "game-lib";

export const Environment = () => (
  <>
    <Rain />
    <fog attach="fog" args={[Colors.richBlack, 5, CAMERA_FAR]} />
    <color attach="background" args={[Colors.richBlack]} />
  </>
);

export const EnvironmentV2 = () => (
  <DeferredComponent Component={Environment} />
);

register(EnvironmentV2, "EnvironmentV2");
