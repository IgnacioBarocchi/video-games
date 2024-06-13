import { ROAD_LENGTH } from "game-constants";
import { memo, useCallback, useEffect } from "react";
import useCarGameStore from "../store/store";
import { CarPlayer as Player } from "characters";

export const CarPlayer = memo(() => {
  const gameOver = useCarGameStore((state) => state.gameOver);
  const setLoading = useCarGameStore(
    useCallback((state) => state.setLoading, [])
  );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Player
      position={[0, 0.1, ROAD_LENGTH - 50]}
      orientation={[0, 0, 1]}
      controlled={!gameOver}
    />
  );
});
