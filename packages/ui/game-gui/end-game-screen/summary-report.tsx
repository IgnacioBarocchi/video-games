import { Paragraph } from "../../utilities";
import { FloatingAlert } from "../../utilities/floating-alert";
import { block } from "million/react";
import { FC, memo, useMemo, useState } from "react";
import { DOLLAR_RATE } from "game-constants";
import { Box } from "../../utilities/box2";
import CountUp from "react-countup";

export interface SummaryReportProps {
  balanceDetails: {
    "HIT ZOMBIE": { quantity: number; cost: number };
    "HIT BARRIER": { quantity: number; cost: number };
    "SPEED FEE": { quantity: number; cost: number };
    total: number;
  };
  visible: boolean;
}

type Report = { quantity: number; cost: number };

type SummaryItemProps = {
  start: number;
  end: number;
  entity: string;
  quantity: number;
  prefix: string;
  onEnd?: () => void;
};

const Item: FC<SummaryItemProps> = ({
  start,
  end,
  prefix,
  entity,
  quantity,
  onEnd,
}) => {
  return (
    <Box.Core
      direction="horizontal"
      g="md"
      p="none"
      alignment="center"
      justification="flex-start"
    >
      <Paragraph font="Technor">
        {entity} {isNaN(quantity) ? "" : `[x${quantity}]`}
      </Paragraph>
      <Paragraph font="Technor">...</Paragraph>
      <Paragraph>
        <CountUp
          prefix={prefix}
          separator="."
          decimal=","
          start={start}
          end={end}
          duration={5}
          delay={1}
          onEnd={onEnd}
          decimals={2}
        ></CountUp>
      </Paragraph>
    </Box.Core>
  );
};

const Table = memo<Pick<SummaryReportProps, "balanceDetails">>(
  ({ balanceDetails }) => {
    const [displayDollars, setDisplayDollars] = useState(false);
    const USD = useMemo(
      () => Number((balanceDetails.total / DOLLAR_RATE).toFixed(2)),
      []
    );
    const zombiesResume: Report = useMemo(
      () => balanceDetails["HIT ZOMBIE"],
      []
    );
    const barriersResume: Report = useMemo(
      () => balanceDetails["HIT BARRIER"],
      []
    );
    const speedFee: Report = useMemo(() => balanceDetails["SPEED FEE"], []);

    // *** elemets.

    const ARSCount = useMemo(
      () => () =>
        (
          <Item
            prefix="ARS "
            entity="Total en pesos"
            start={balanceDetails.total}
            end={0}
            onEnd={() => setDisplayDollars(true)}
          />
        ),

      []
    );

    const USDCount = useMemo(
      () => () =>
        (
          <Item
            prefix="USD "
            entity="Total en dólares"
            start={0}
            end={USD}
            onEnd={() => setDisplayDollars(true)}
          />
        ),

      []
    );

    const ZombiesCount = useMemo(
      () => () =>
        (
          <Item
            prefix=" ARS -"
            entity={`Zombies`}
            quantity={zombiesResume.quantity}
            start={0}
            end={Number(zombiesResume.cost)}
          />
        ),

      []
    );

    const BarriersCount = useMemo(
      () => () =>
        (
          <Item
            prefix=" ARS -"
            entity={`Barreras`}
            quantity={barriersResume.quantity}
            start={0}
            end={Number(barriersResume.cost)}
          />
        ),

      []
    );

    const SpeedFeeCount = useMemo(
      () => () =>
        (
          <Item
            prefix=" ARS -"
            entity={`Multa de velocidad`}
            quantity={speedFee.quantity}
            start={0}
            end={Number(speedFee.cost)}
          />
        ),

      []
    );

    return (
      <FloatingAlert
        place="center"
        skin="glass"
        width="550px"
        Prefix={undefined}
      >
        <Box.Core direction="vertical">
          <ZombiesCount />
          <BarriersCount />
          <SpeedFeeCount />
          <ARSCount />
          {displayDollars && (
            <Paragraph>
              <USDCount />
            </Paragraph>
          )}
        </Box.Core>
      </FloatingAlert>
    );
  }
);

export const SummaryReport = memo<SummaryReportProps>(
  block(({ balanceDetails, visible }) => {
    if (visible) {
      return <Table balanceDetails={balanceDetails} />;
    }

    return null;
  })
);
