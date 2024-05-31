import React, { useEffect, useState } from "react";

import styled from "styled-components";

const Cursor = styled.div`
  position: fixed;
  width: 25px;
  height: 25px;
  border: 3px solid white;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return <Cursor style={{ left: `${position.x}px`, top: `${position.y}px` }} />;
};
