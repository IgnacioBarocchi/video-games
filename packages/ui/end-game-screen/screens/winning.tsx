import CountUp from "react-countup";
import styled from "styled-components";
import { memo, useMemo, useState } from "react";
import { Box } from "../../elements/Box";
import { Text } from "../../elements/Text";
import { DOLLAR_RATE } from "game-constants";

type Resume = { quantity: number; cost: number };
const space = " ";
const Money = styled.span<{ expended?: boolean }>`
  color: ${({ expended }) => (expended ? "red" : "#3e9c35")};
`;

const MoneyResult = ({ start, end, prefix, textContent, onEnd }) => {
  return (
    <Text>
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
      {textContent}
    </Text>
  );
};

export const Winning = memo(({ balanceDetails, onEnd }) => {
  const [displayDollars, setDisplayDollars] = useState(false);
  const USD = useMemo(
    () => Number((balanceDetails.total / DOLLAR_RATE).toFixed(2)),
    []
  );
  const zombiesResume: Resume = useMemo(() => balanceDetails["HIT ZOMBIE"], []);
  const barriersResume: Resume = useMemo(
    () => balanceDetails["HIT BARRIER"],
    []
  );
  const speedFee: Resume = useMemo(() => balanceDetails["SPEED FEE"], []);

  const ARSCount = useMemo(
    () => () =>
      (
        <MoneyResult
          prefix="ARS "
          start={balanceDetails.total}
          end={0}
          onEnd={() => setDisplayDollars(true)}
          textContent={space}
        />
      ),

    []
  );

  const USDCount = useMemo(
    () => () =>
      (
        <MoneyResult
          prefix="USD "
          start={0}
          end={USD}
          onEnd={() => setDisplayDollars(true)}
          textContent={space}
        />
      ),

    []
  );

  const ZombiesCount = useMemo(
    () => () =>
      (
        <Box direction="horizontal" fullWidth fullHeight visible={true}>
          <Text>
            Zombies: x{zombiesResume.quantity}
            {space}...{space}
          </Text>
          <MoneyResult
            prefix=" ARS -"
            start={0}
            end={Number(-zombiesResume.cost)}
            // onEnd={() => setDisplayDollars(true)}
            textContent={space}
          />
        </Box>
      ),

    []
  );

  const BarriersCount = useMemo(
    () => () =>
      (
        <Box direction="horizontal" fullWidth fullHeight visible={true}>
          <Text>
            Barreras: x{barriersResume.quantity}
            {space}...{space}
          </Text>
          <MoneyResult
            prefix=" ARS -"
            start={0}
            end={barriersResume.cost}
            // onEnd={() => setDisplayDollars(true)}
            textContent={space}
          />
        </Box>
      ),

    []
  );

  const SpeedFeeCount = useMemo(
    () => () =>
      (
        <Box direction="horizontal" fullWidth fullHeight visible={true}>
          <Text>
            Multa de velocidad: x{speedFee.quantity}
            {space}...{space}
          </Text>
          <MoneyResult
            prefix=" ARS -"
            start={0}
            end={speedFee.cost}
            // onEnd={() => setDisplayDollars(true)}
            textContent={space}
          />
        </Box>
      ),

    []
  );
  return (
    <Box direction="vertical" fullWidth fullHeight visible={true}>
      <ZombiesCount />
      <BarriersCount />
      <SpeedFeeCount />
      <ARSCount />
      {displayDollars ? (
        <Money>
          <USDCount />
        </Money>
      ) : (
        <Text>USD 0</Text>
      )}
    </Box>
  );
});

/* <Text>
        {displayDollars ? (
          <Money>
            <CountUp
              prefix="USD "
              separator="."
              decimal=","
              start={0}
              end={USD}
              duration={1}
              delay={0}
              decimals={2}
              onEnd={onEnd}
            ></CountUp>
          </Money>
        ) : (
          "USD 0"
        )}
        {space}
      </Text> */
/* <Text>
  <CountUp
    prefix="ARS "
    separator="."
    decimal=","
    start={balanceDetails.total}
    end={0}
    duration={5}
    delay={1}
    onEnd={() => setDisplayDollars(true)}
    decimals={2}
  ></CountUp>
  {space}
</Text> */
