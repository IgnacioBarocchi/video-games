import { Box } from "../elements/Box";
import { Panel, CenteredPanel } from "../elements/Panel";
import { Text } from "../elements/Text";
import { Winning } from "./screens/winning";

export const EndGameScreen: React.FC<{
  gameOverPayload?: { reason: "TIME OUT" | "WON" };
  ARS: number;
  USD: number;
}> = ({ gameOverPayload, ARS, USD }) => {
  if (!gameOverPayload) {
    return null;
  }

  const { reason } = gameOverPayload;

  if (reason === "WON") {
    return <Winning ARS={ARS} USD={USD} />;
  }

  if (reason === "TIME OUT") {
    return (
      <Box direction="vertical" fullWidth fullHeight visible={true}>
        <Text>Misión fracasada</Text>
        <Text>Se acabó el tiempo</Text>
      </Box>
    );
  }

  return (
    // <Panel>
    <div>se rompió el auto</div>
  );
};
