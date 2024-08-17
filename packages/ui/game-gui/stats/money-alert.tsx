import { styled, keyframes } from "styled-components";
import { Paragraph } from "../../utilities";
import { FloatingAlert } from "../../utilities/floating-alert";
import { GiShamblingZombie } from "react-icons/gi";
import { BsSpeedometer } from "react-icons/bs";
import { FaMoneyBill, FaRoadBarrier } from "react-icons/fa6";

import { block } from "million/react";

const scale = keyframes`
  from {
    scale: 1.25;
  }
  to {
    scale: 1;
  }
`;

const Combo = styled(Paragraph)`
  animation: ${scale} 3s;
  transition: scale 3s;
`;

const Prefix = ({
  reason,
}: {
  reason: "HIT ZOMBIE" | "HIT BARRIER" | "SPEED FEE";
}) => {
  const Icon = {
    "HIT ZOMBIE": GiShamblingZombie,
    "HIT BARRIER": FaRoadBarrier,
    "SPEED FEE": BsSpeedometer,
  }[reason || "HIT ZOMBIE"];

  return <Icon size={35} />;
};

export const MoneyAlert = block(({ total, loss, reason, combo, visible }) => (
  <>
    <FloatingAlert
      visible={visible && !loss}
      place="bottom-left"
      skin="glass"
      width="fit-content"
      Prefix={() => <FaMoneyBill size={35} />}
    >
      <Paragraph font="Technor">{`${total.toLocaleString(
        "es-ES"
      )} ARS`}</Paragraph>
    </FloatingAlert>
    <FloatingAlert
      visible={visible && loss}
      place="bottom-left"
      skin="glass"
      width="250px"
      Prefix={() => <Prefix reason={reason} />}
    >
      {combo && <Combo font="Technor">{`[ ${combo} ]`}</Combo>}
      <Paragraph font="Technor">{`- ${loss} ARS`}</Paragraph>
    </FloatingAlert>
  </>
));
