import { Paragraph } from "../../utilities";
import { FloatingAlert } from "../../utilities/floating-alert";
import { FaClock } from "react-icons/fa";
import { block } from "million/react";
import { Box } from "../../utilities/box2";

export const TimeoutAlert = block(({ visible }) => (
  <FloatingAlert
    visible={visible}
    place="center"
    skin="glass"
    width="350px"
    Prefix={() => <FaClock size={35} />}
  >
    <Box.Core direction="vertical" visible={visible}>
      <Paragraph font="Technor">Misión fracasada</Paragraph>
      <Paragraph font="Technor">Se te acabó el tiempo</Paragraph>
    </Box.Core>
  </FloatingAlert>
));
