import { styled } from "styled-components";
import { Panel } from "../elements/Panel";
import { Text } from "../elements/Text";

const Background = styled.div`
  background: black;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingScreen = () => {
  return (
    <Panel>
      <Background>
        <Text>Cargando</Text>
      </Background>
    </Panel>
  );
};
