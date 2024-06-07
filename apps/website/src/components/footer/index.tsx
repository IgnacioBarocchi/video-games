import { styled } from "styled-components";
import { FOOTER_HEIGHT } from "../../constants";
import { Colors } from "game-constants";

export const Footer = styled.footer`
  height: ${FOOTER_HEIGHT}px;
  width: 100vw;
  background: ${Colors.richBlack};
  border-top: 1px solid ${Colors.darkGrey};
  padding-left: 1rem;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    padding-left: 0;
    justify-content: center;
  }
}
`;
