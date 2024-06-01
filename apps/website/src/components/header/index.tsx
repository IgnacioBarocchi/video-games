import { styled } from "styled-components";
import { Colors, HEADER_HEIGHT } from "../../constants";

export const Header = styled.header`
  height: ${HEADER_HEIGHT}px;
  background: ${Colors.richBlack};
  border-bottom: 1px solid ${Colors.a};
  padding-left: 1rem;
`;
