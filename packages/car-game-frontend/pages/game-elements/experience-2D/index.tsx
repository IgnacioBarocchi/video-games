// todo use drei view
import { Suspense, lazy } from "react";
import { LoadingPanel } from "./gui-panels/loading-panel";
import { LoadingScreen } from "ui";

const TitlePanel = lazy(() => import("./gui-panels/title-panel"));
const KMPanel = lazy(() => import("./gui-panels/km-panel"));
const ClockPanel = lazy(() => import("./gui-panels/clock-panel"));
const EndGamePanel = lazy(() => import("./gui-panels/end-game-panel"));
const BackToMenuPanel = lazy(() => import("./gui-panels/back-to-menu-panel"));
const MoneyLossPanel = lazy(() => import("./gui-panels/money-loss-panel"));

export const ProExperience2D = () => (
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
      <BackToMenuPanel />
      <TitlePanel />
      <KMPanel />
    </Suspense>
  </div>
);
