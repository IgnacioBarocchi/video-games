import { FC } from "react";
import { Panel, CenteredPanel } from "../../elements/Panel";
import { Text } from "../../elements/Text";
import { Colors } from "game-constants";

export const LoadingScreen: FC<{ subject: string }> = ({ subject }) => {
  return (
    <Panel backgroundValueCSSText={Colors.richBlack}>
      <CenteredPanel x y>
        <Text>Cargando: {subject}</Text>
      </CenteredPanel>
    </Panel>
  );
};
