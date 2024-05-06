import { styled } from "styled-components";

export const Button = styled.button<{ detailed?: boolean }>`
  font-size: 3em;
  background: #1e63d5;
  border: none;
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
`;
