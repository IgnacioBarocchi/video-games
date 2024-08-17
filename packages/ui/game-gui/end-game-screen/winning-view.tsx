import { RiBankFill } from "react-icons/ri";
import { Paragraph } from "../../utilities";
import { FloatingAlert } from "../../utilities/floating-alert";
import { block } from "million/react";
import { Box } from "../../utilities/box2";

export const WinningView = block(({ visible }) => (
  <FloatingAlert
    visible={visible}
    place="center"
    skin="glass"
    width="fit-content"
    Prefix={() => <RiBankFill size={35} />}
  >
    <Box.Core direction="vertical" visible={visible}>
      <Paragraph font="Technor">Misión completada.</Paragraph>
      <Paragraph font="Technor">Llegaste al banco.</Paragraph>
    </Box.Core>
  </FloatingAlert>
));
