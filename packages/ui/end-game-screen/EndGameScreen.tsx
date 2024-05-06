import { Panel } from "../elements/Panel";
import { Timeout } from "./screens/timeout";
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
      <Panel>
        <Timeout />
      </Panel>
    );
  }

  return (
    <Panel>
      <div>se rompió el auto</div>
    </Panel>
  );
};
