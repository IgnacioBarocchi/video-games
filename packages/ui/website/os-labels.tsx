import { styled } from "styled-components";
import { OSBadge } from "../utilities";
import { memo } from "react";

const Container = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: space-evenly;

  @media (max-width: 768px) {
    font-size: 30px;
    width: 100%;
  }
`;

export interface OSLabelsProps {
  links: {
    linux: string;
    windows: string;
    mac: string;
  };
}

export const OSLabels = memo<OSLabelsProps>(({ links }) => (
  <Container>
    <OSBadge linkTo={links.linux} os="Linux" />
    <OSBadge linkTo={links.windows} os="Windows" />
    <OSBadge linkTo={links.mac} os="macOs" />
  </Container>
));
