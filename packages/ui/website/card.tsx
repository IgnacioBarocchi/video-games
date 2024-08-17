// import { Heading } from "react-aria-components";
import { Paragraph, Span } from "../utilities";
import { Box } from "../utilities/box2";
import { ReactNode, memo } from "react";
import { styled } from "styled-components";
import { Heading, HeadingProps } from "../utilities/heading";

const Wrapper = memo<{ children: ReactNode }>(({ children }) => {
  return (
    <Box.Web direction="vertical" st={{ padding: "25px" }} skin="glass">
      {children}
    </Box.Web>
  );
});

const Header = memo<Omit<HeadingProps, "children"> & { title }>(
  ({ title, index = "2", font = "Tanker" }) => {
    return (
      <Heading index={index} font={font}>
        {title}
      </Heading>
    );
  }
);
const Content = memo<{ paragraph: string }>(({ paragraph }) => {
  return <Paragraph>{paragraph}</Paragraph>;
});

const Footer = memo<{ text: string }>(({ text }) => {
  return <Span>{text}</Span>;
});

const Separator = styled.hr``;

export const Card = { Wrapper, Header, Content, Footer, Separator };
