import CountUp from "react-countup";
import styled from "styled-components";
import { useState } from "react";
import { Panel } from "../../elements/Panel";

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Report = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

const Item = styled.div`
  font-size: 4em;
  font-weight: 1000;
  -webkit-text-stroke: 3px black;
`;

const Money = styled.span<{ expended?: boolean }>`
  color: ${({ expended }) => (expended ? "red" : "#3e9c35")};
`;

export const Winning = ({ ARS, USD }) => {
  const [displayDollars, setDisplayDollars] = useState(false);

  return (
    <Panel>
      <Box>
        <Report>
          <Item>
            <CountUp
              prefix="ARS "
              separator="."
              start={ARS}
              end={0}
              duration={5}
              delay={1}
              onEnd={() => setDisplayDollars(true)}
            ></CountUp>{" "}
          </Item>
          <Item>
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
          </Item>
        </Report>
      </Box>
    </Panel>
  );
};
