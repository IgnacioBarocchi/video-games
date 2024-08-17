import { LAST_SECONDS, TIME_LIMIT } from "game-constants";
import { Paragraph } from "../utilities";
import { FloatingAlert } from "../utilities/floating-alert";
import { block } from "million/react";
import { FaClock } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";

const initialValues = `
  transform: none;
`;

//   position: relative;
const finalValues = ` 
top: 20%;
left: 50%;
transform: translateX(-50%);
& > * {
    font-size: 80px;
    color: red;
  }
  `;

const animationRule = css(
  ["", " 0.5s linear;"] as any as TemplateStringsArray,
  keyframes`
  from {
    ${initialValues}
  }
  to {
    ${finalValues}
  }
`
);

const AnimatedContainer = styled(FloatingAlert)<{ lastSeconds: boolean }>`
  ${({ lastSeconds }) => (lastSeconds ? finalValues : initialValues)};
  animation: ${({ lastSeconds }) => (lastSeconds ? animationRule : "none")};
  width: fit-content;
`;

// export const Clock = () => <></>;
export const Clock = block(({ tickAudio, onEnd }) => {
  const [timer, setTimer] = useState(TIME_LIMIT);
  const [lastSeconds, setLastSeconds] = useState(false);
  const id = useRef(null);

  const clear = () => {
    window.clearInterval(id.current);
  };

  useEffect(() => {
    id.current = window.setInterval(() => {
      setTimer((time) => time - 1);
    }, 1000);
    return () => clear();
  }, []);

  useEffect(() => {
    if (!lastSeconds && timer === LAST_SECONDS) {
      setLastSeconds(true);
    }

    if (timer === 0) {
      clear();
      onEnd();
    }

    if (timer <= LAST_SECONDS) {
      const tick = new Audio(tickAudio);
      tick.volume = 0.3;
      tick.play();
    }
  }, [timer]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <AnimatedContainer
      lastSeconds={lastSeconds && minutes !== 0 && seconds !== 0}
      visible={true}
      place="top-left"
      skin="glass"
      width="150px"
      Prefix={() => <FaClock size={35} />}
    >
      <Paragraph font="Technor">
        {`0${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
      </Paragraph>
    </AnimatedContainer>
  );
});
