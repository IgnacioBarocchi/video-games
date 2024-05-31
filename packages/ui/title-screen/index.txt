import { styled } from "styled-components";
import { Panel } from "../elements/Panel";
import { Title } from "../elements/Text";

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export const TitleScreen = ({ text }) => {
  return (
    <Panel>
      <Box>
        <Title>{text}</Title>
      </Box>
    </Panel>
  );
};
