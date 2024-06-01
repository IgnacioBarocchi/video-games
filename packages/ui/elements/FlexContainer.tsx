import styled from "styled-components";

export const FlexContainer = styled.div<{
  height?: string;
  width?: string;
  justifyContent?: string;
}>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => (width ? width : "auto")};
  height: ${({ height }) => (height ? height : "auto")};
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : "auto"};
`;
// gap: 3em;

export const FlexRow = styled.div<{ height?: string }>`
  display: flex;
  justify-content: space-around;
  gap: 3em;
  align-items: center;
  height: ${({ height }) => (height ? height : "auto")};
`;
// @media (max-width: 768px) {
//   flex-direction: column;
//   gap: 3em;
// }
