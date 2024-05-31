import styled from "styled-components";

export const FlexContainer = styled.div<{
  height?: string;
  width?: string;
  justifyContent?: string;
}>`
  display: flex;
  flex-direction: column;
  gap: 3em;
  width: ${({ width }) => (width ? width : "auto")};
  height: ${({ height }) => (height ? height : "auto")};
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : "auto"};
`;

export const FlexRow = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 3em;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3em;
  }
`;
