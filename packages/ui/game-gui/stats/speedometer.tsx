import { Paragraph } from "../../utilities/paragraph";
import { FloatingAlert } from "../../utilities/floating-alert";
import { BsSpeedometer } from "react-icons/bs";
import { block } from "million/react";

export const Speedometer = block(({ speed, visible }) => (
  <FloatingAlert
    visible={visible}
    place="bottom-right"
    skin="glass"
    width="200px"
    Prefix={() => <BsSpeedometer size={35} />}
  >
    <Paragraph font="Technor">{`${speed} Km/h`}</Paragraph>
  </FloatingAlert>
));
