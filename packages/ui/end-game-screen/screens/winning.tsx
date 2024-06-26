import CountUp from "react-countup";
import styled from "styled-components";
import { useState } from "react";
import { Box } from "../../elements/Box";
import { Text } from "../../elements/Text";

const Money = styled.span<{ expended?: boolean }>`
  color: ${({ expended }) => (expended ? "red" : "#3e9c35")};
`;

export const Winning = ({ ARS, USD, onEnd }) => {
  const [displayDollars, setDisplayDollars] = useState(false);

  return (
    <Box direction="vertical" fullWidth fullHeight visible={true}>
      <Text>
        <CountUp
          prefix="ARS "
          separator="."
          decimal=","
          start={ARS}
          end={0}
          duration={5}
          delay={1}
          onEnd={() => setDisplayDollars(true)}
          decimals={2}
        ></CountUp>{" "}
      </Text>
      <Text>
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
        )}{" "}
      </Text>
    </Box>
  );
};
