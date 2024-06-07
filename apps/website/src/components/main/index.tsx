import { styled } from "styled-components";
import { Colors } from "game-constants";

export const Main = styled.main`
  background: ${Colors.richBlack};
  color: ${Colors.white};
  overflow-x: hidden;
  & a {
    color: ${Colors.white};
  }
`;
// cursor: none;
