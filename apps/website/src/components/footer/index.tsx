import { styled } from "styled-components";
import { FOOTER_HEIGHT } from "../../constants";
import { Colors } from "game-constants";

export const Footer = styled.footer`
  height: ${FOOTER_HEIGHT}px;
  background: ${Colors.richBlack};
  border-top: 1px solid ${Colors.darkGrey};
  padding-left: 1rem;
  display: flex;
  align-items: center;
}
`;
