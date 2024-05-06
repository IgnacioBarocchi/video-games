import React from "react";
import { Box } from "../elements/Box";
import { Panel } from "../elements/Panel";
import { Text, Title } from "../elements/Text";

export interface GUIProps {
  displayClock: boolean;
  ClockSlot: React.FC;
  displayNotification: boolean;
  NotificationSlot: React.FC;
  displayTitle: boolean;
  title: string;
  EndGameSlot: React.FC;
  displayEndGameSlot: boolean;
}
export const InGameScreen = React.memo<GUIProps>(
  ({
    displayClock,
    ClockSlot,
    displayNotification,
    NotificationSlot,
    displayTitle,
    title,
    EndGameSlot,
    displayEndGameSlot,
  }) => {
    return (
      <Panel>
        <Box visible fullHeight fullWidth>
          <Box
            visible={true}
            fullHeight
            direction="vertical"
            justification="space-between"
          >
            <Box visible={displayClock}>{ClockSlot}</Box>
            <Box visible={displayNotification}>{NotificationSlot}</Box>
          </Box>
          <Box visible={true} fullHeight direction="vertical">
            <Box visible={displayTitle}>
              <Title>{title}</Title>
            </Box>
            <Box visible={displayEndGameSlot}>{EndGameSlot}</Box>
          </Box>
        </Box>
      </Panel>
    );
  }
);
