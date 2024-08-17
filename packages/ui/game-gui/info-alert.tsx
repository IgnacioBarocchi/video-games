import { Paragraph } from "../utilities/paragraph";
import { FloatingAlert } from "../utilities/floating-alert";
import { FaInfoCircle } from "react-icons/fa";
import { block } from "million/react";

export const InfoAlert = block(({ title }) => {
  return (
    <FloatingAlert
      visible={title}
      place="top-center"
      skin="glass"
      width="fit-content"
      Prefix={() => <FaInfoCircle size={35} />}
    >
      <Paragraph font="Technor">{title}</Paragraph>
    </FloatingAlert>
  );
});
