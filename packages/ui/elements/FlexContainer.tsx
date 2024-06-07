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
export const FlexRow = styled.div<{
  heights: { desktop: string; mobile: string };
}>`
  display: flex;
  justify-content: space-around;
  gap: 3em;
  align-items: center;
  height: ${({ heights }) => heights.desktop};
  @media (max-width: 576px) {
  }
  @media (max-width: 992px) {
  }
  @media (max-width: 1200px) {
  }
  @media (max-width: 768px) {
    height: ${({ heights }) => heights.mobile};
    flex-direction: column;
    gap: 3em;
  }
`;
// @media (max-width: 576px) {}

//   flex-direction: column;
//   gap: 3em;
// }
