import { styled } from "styled-components";

const Container = styled.main`
  display: grid;
  grid-template-columns: 1.1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "A1 A2 A3"
    "B1 B2 B3"
    "C1 C2 C3";
`;

const TopLeft = styled.div`
  grid-area: A1;
`;

const TopMid = styled.div`
  grid-area: A2;
`;

const TopRight = styled.div`
  grid-area: A3;
`;

const MidLeft = styled.div`
  grid-area: B1;
`;

const MidMid = styled.div`
  grid-area: B2;
`;

const MidRight = styled.div`
  grid-area: B3;
`;

const BotLeft = styled.div`
  grid-area: C1;
`;

const BotMid = styled.div`
  grid-area: C2;
`;

const BotRight = styled.div`
  grid-area: C3;
`;

export const Grid: React.FC<{
  topLeftElements;
  topMidElements;
  topRightElements;
  midLeftElements;
  midMidElements;
  midRightElements;
  botLeftElements;
  botMidElements;
  botRightElements;
}> = ({
  topLeftElements,
  topMidElements,
  topRightElements,
  midLeftElements,
  midMidElements,
  midRightElements,
  botLeftElements,
  botMidElements,
  botRightElements,
}) => {
  return (
    <Container>
      <TopLeft>{topLeftElements}</TopLeft>
      <TopMid>{topMidElements}</TopMid>
      <TopRight>{topRightElements}</TopRight>
      <MidLeft>{midLeftElements}</MidLeft>
      <MidMid>{midMidElements}</MidMid>
      <MidRight>{midRightElements}</MidRight>
      <BotLeft>{botLeftElements}</BotLeft>
      <BotMid>{botMidElements}</BotMid>
      <BotRight>{botRightElements}</BotRight>
    </Container>
  );
};
