import CountUp from "react-countup";
import styled from "styled-components";
import { useState } from "react";
import { Panel } from "../../elements/Panel";
import { Box } from "../../elements/Box";
import { Text } from "../../elements/Text";

const Money = styled.span<{ expended?: boolean }>`
  color: ${({ expended }) => (expended ? "red" : "#3e9c35")};
`;

export const Winning = ({ ARS, USD }) => {
  const [displayDollars, setDisplayDollars] = useState(false);

  return (
    <Box direction="vertical" fullWidth fullHeight visible={true}>
      <Text>
        <CountUp
          prefix="ARS "
          separator="."
          start={ARS}
          end={0}
          duration={5}
          delay={1}
          onEnd={() => setDisplayDollars(true)}
        ></CountUp>{" "}
      </Text>
      <Text>
        {displayDollars ? (
          <Money>
            <CountUp
              prefix="USD "
              start={0}
              end={USD}
              duration={1}
              delay={0}
            ></CountUp>
          </Money>
        ) : (
          "USD 0"
        )}{" "}
      </Text>
    </Box>
  );
};
