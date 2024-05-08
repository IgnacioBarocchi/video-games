import { Panel, CenteredPanel } from "../../elements/Panel";
import { Text } from "../../elements/Text";

export const LoadingScreen = () => {
  return (
    <Panel backgroundValueCSSText="black">
      <CenteredPanel x y>
        <Text>Cargando</Text>
      </CenteredPanel>
    </Panel>
  );
};
