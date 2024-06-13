import { CSSProperties, useMemo } from "react";

import useCarGameStore from "../../../../store/store";

export const Filter2DOverlay = ({ children }) => {
  const gameOver = useCarGameStore((state) => state.gameOver);
  const containerStyle: CSSProperties = useMemo(
    () => ({
      pointerEvents: "none",
      filter:
        gameOver?.reason === "TIME OUT"
          ? "hue-rotate(240deg) saturate(3.3) grayscale(95%)"
          : "none",
      height: "100vh",
    }),
    [gameOver]
  );

  return <div style={containerStyle}>{children}</div>;
};

export default Filter2DOverlay;
