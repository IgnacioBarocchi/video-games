import { Layer } from "react-parallax-scroll";
import { FlexRow } from "ui";
import "./styles.css";
import { FC, ReactNode, useMemo } from "react";
import { styled } from "styled-components";
import { Colors, FOOTER_HEIGHT, HEADER_HEIGHT } from "../../constants";

const Row = styled(FlexRow)``;

export const Section: FC<{
  children: ReactNode[];
  preset: "1" | "2" | "3";
  afterHeader?: boolean;
  beforeFooter?: boolean;
  id?: string;
}> = ({ children, preset = "1", afterHeader, beforeFooter, id }) => {
  const height = useMemo(() => {
    if (!afterHeader && !beforeFooter) {
      return "100vh";
    }
    return `calc(100vh - ${afterHeader ? HEADER_HEIGHT : FOOTER_HEIGHT}px)`;
  }, [afterHeader, beforeFooter]);

  return (
    <div
      id={id}
      style={{
        background: `linear-gradient(0deg, ${Colors.richBlack} 80%, ${Colors.darkGrey} 100%)`,
      }}
    >
      <Layer className={`banner banner-${preset}`} settings={{ speed: 0.3 }}>
        <Row height={height}>{children}</Row>
      </Layer>
    </div>
  );
};
