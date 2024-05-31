import { styled } from "styled-components";

export const Text = styled.div<{ hideStroke?: boolean }>`
  color: white;
  font-family: "Technor";
  -webkit-text-stroke: ${({ hideStroke }) =>
    hideStroke ? "none" : "3px black"};
  font-size: 3em;
`;

export const Title = styled.h1`
  margin: 0;
  padding: 0;
  color: white;
  font-size: 5em;
  -webkit-text-stroke: 3px black;
  text-transform: uppercase;
`;
