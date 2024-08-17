import { useEffect, useRef, useState } from "react";
import { css, keyframes, styled } from "styled-components";
import { panelPadding } from "./elements/Panel";
import { Text } from "./elements/Text";
import { LAST_SECONDS, TIME_LIMIT } from "game-constants";
import { FloatingNotification } from "./FloatingNotification";

const initialValues = `
  top: ${panelPadding};
  left: ${panelPadding};
  color: white;
  transform: none;
`;

const finalValues = ` 
  position: relative;
  top: 20%;
  left: 50%;
  color: red;
  transform: translateX(-50%);

  & > * {
    font-size: 75px;
  }
`;

const move = keyframes`
  from {
    ${initialValues}
  }
  to {
    ${finalValues}
  }
`;

const animationRule = css(
  ["", " 0.5s linear;"] as any as TemplateStringsArray,
  move
);

const MovingText = styled(Text)<{ lastSeconds: boolean }>`
  ${({ lastSeconds }) => (lastSeconds ? finalValues : initialValues)};
  animation: ${({ lastSeconds }) => (lastSeconds ? animationRule : "none")};
  width: fit-content;
`;

export const CountDown = ({ tickAudio, onEnd }) => {
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

  if (minutes === 0 && seconds === 0) {
    return null;
  }

  return (
    <FloatingNotification
      dismiss={false}
      position="top-left"
      fullWidth={true}
      fullHeight={true}
    >
      <MovingText lastSeconds={lastSeconds}>
        {`0${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
      </MovingText>
    </FloatingNotification>
  );
};

// relative: absolute;
// z-index: 3;
// background: green;
// width: 100vw;
