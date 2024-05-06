import { CountDown } from "../CountDown";
import { Grid } from "./grid";

export const GUIScreen2D = ({
  didTheGameStart,
  isTheGameOver,
  titleScreenProps,
  clockProps,
  winningScreenProps,
  loosingScreenProps,
  notificationProps,
}) => {
  const { tickAudio, onEnd, timeLimit, lastSecondsLimit } = clockProps;

  return <Grid topLeftElements={<CountDown {...clockProps} />} />;
};
