import { FC } from "react";
import { SummaryReport, SummaryReportProps } from "./summary-report";
import { TimeoutAlert } from "./timeout-alert";
import { WinningView } from "./winning-view";
import { BackToMenuPanel } from "./menu";

export interface EndGameViewProps extends SummaryReportProps {
  displayWinningView: boolean;
  displayTimeoutView: boolean;
  displaySummaryReportView: boolean;
  displayMenu: boolean;
  onBackToMenu: () => void;
}

export const EndGameView: FC<EndGameViewProps> = ({
  onBackToMenu,
  balanceDetails,
  displayWinningView,
  displayTimeoutView,
  displaySummaryReportView,
  displayMenu,
}) => {
  return (
    <>
      <WinningView visible={displayWinningView} />
      <TimeoutAlert visible={displayTimeoutView} />
      <SummaryReport
        balanceDetails={balanceDetails}
        visible={displaySummaryReportView}
      />
      <BackToMenuPanel visible={displayMenu} onBackToMenu={onBackToMenu} />
    </>
  );
};
