import { styled } from "styled-components";

//todo: extend Text as button

export const Button = styled.button<{ detailed?: boolean }>`
  font-size: 3em;
  background: #1e63d5;
  border: none;
  color: white;
  clip-path: ${({ detailed }) =>
    detailed
      ? `polygon(
    1% 0,
    99% 0,
    100% 20%,
    100% 80%,
    99% 100%,
    1% 100%,
    0% 80%,
    0% 20%
  )`
      : "none"};
  padding: ${({ detailed }) => (detailed ? "0 1rem" : "auto")};
`;

export const FlexButton = styled(Button)`
  flex: 1;
`;
