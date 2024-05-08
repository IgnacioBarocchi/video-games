import { useEffect, useRef, useState } from "react";
import { css, keyframes, styled } from "styled-components";
import { panelPadding } from "./elements/Panel";
import { Text } from "./elements/Text";

const initialValues = `
  top: ${panelPadding};
  left: ${panelPadding};
  font-size: 3em; 
  color: white;
  transform: none;
`;

const finalValues = `
  top: 20%;
  left: 50%;
  font-size: 6em;
  color: red;
  transform: translateX(-50%);
  `;
//

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

const Container = styled(Text)<{ lastSeconds: boolean }>`
  ${({ lastSeconds }) => (lastSeconds ? finalValues : initialValues)};
  position: absolute;
  animation: ${({ lastSeconds }) => (lastSeconds ? animationRule : "none")};
`;

export const CountDown = ({
  tickAudio,
  onEnd,
  timeLimit,
  lastSecondsLimit,
}) => {
  const [timer, setTimer] = useState(timeLimit);
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
    if (!lastSeconds && timer === lastSecondsLimit) {
      setLastSeconds(true);
    }

    if (timer === 0) {
      clear();
      onEnd();
    }

    if (timer <= lastSecondsLimit) {
      new Audio(tickAudio).play();
    }
  }, [timer]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <Container lastSeconds={lastSeconds}>
      {`0${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
    </Container>
  );
};
