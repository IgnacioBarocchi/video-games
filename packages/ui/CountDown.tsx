import { useEffect, useRef, useState } from "react";
import { css, keyframes, styled } from "styled-components";
import { Panel, panelPadding } from "./elements/Panel";
import { Text } from "./elements/Text";

const move = keyframes`
  from {
    top: 0;
    left: 0%;
    font-size: 3em; 
    color: white;
  }
  to {
    top: 20%;
    left: 100%;
    font-size: 6em;
    color: red;
  }
`;

const animationRule = css(
  ["", " 0.5s linear;"] as any as TemplateStringsArray,
  move
);

const RelativeWrapper = styled.div`
  position: relative;
`;

// transform: ${({ lastSeconds }) =>
//     lastSeconds ? "translateX(calc(" + panelPadding + " - 50%))" : "none"};
// top: ${({ lastSeconds }) => (lastSeconds ? "20%" : "0")};
// left: ${({ lastSeconds }) => (lastSeconds ? "50%" : "0")};
const Container = styled(Text)<{ lastSeconds: boolean }>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  color: ${({ lastSeconds }) => (lastSeconds ? "red" : "white")};
  font-size: ${({ lastSeconds }) => (lastSeconds ? "6em" : "3em")};
  animation: ${({ lastSeconds }) => (lastSeconds ? animationRule : "none")};
  font-family: "Technor";
  -webkit-text-stroke: 3px black;
  background: blue;
  opacity: 0.5;
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

  // !new
  return (
    <RelativeWrapper>
      <Container lastSeconds={lastSeconds}>
        {`0${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
      </Container>
    </RelativeWrapper>
  );
  // return (
  //   <Panel fadeIn={true}>
  //     <Container lastSeconds={lastSeconds}>
  //       <div>{`0${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}</div>
  //     </Container>
  //   </Panel>
  // );
};
