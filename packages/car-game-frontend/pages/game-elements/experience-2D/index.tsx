import { expose } from "react-worker-components";
// todo use drei view
import { Suspense, lazy } from "react";
import { LoadingPanel } from "./gui-panels/loading-panel";
import { LoadingScreen } from "ui";

const TitlePanel = lazy(() => import("./gui-panels/title-panel"));
const KMPanel = lazy(() => import("./gui-panels/km-panel"));
const ClockPanel = lazy(() => import("./gui-panels/clock-panel"));
const EndGamePanel = lazy(() => import("./gui-panels/end-game-panel"));
const MoneyLossPanel = lazy(() => import("./gui-panels/money-loss-panel"));

export const Experience2DGUI = () => (
  <div
    style={{
      pointerEvents: "none",
    }}
  >
    <LoadingPanel />
    <Suspense fallback={<LoadingScreen subject="Interfáz gráfica" />}>
      <MoneyLossPanel />
      <ClockPanel />
      <EndGamePanel />
      <TitlePanel />
      <KMPanel />
    </Suspense>
  </div>
);

expose(Experience2DGUI);

export default Experience2DGUI;
