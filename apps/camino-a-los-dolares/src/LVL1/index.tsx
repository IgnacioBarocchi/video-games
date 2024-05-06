import { Trees } from "../Trees";
import { Zombies } from "../Zombies";
import { Signs } from "../entities/signs";
import { Barriers } from "../entities/barrier/Barriers";
import { BurntCars } from "../entities/burnt/BurntCars";
import { Ground } from "../ground";
import { Player } from "../player";
import useGameStore from "../store/store";
import { memo, useEffect } from "react";
const isOldVersion = true;

const Scenario = memo(() => {
  return (
    <>
      <Ground />
      <Barriers isOldVersion={isOldVersion} />
      <Zombies numberOfZombies={50} isOldVersion={false} />
      <BurntCars isOldVersion={isOldVersion} />
      <Signs isOldVersion={isOldVersion} />
      <Trees isOldVersion={isOldVersion} />
    </>
  );
});

export const LVL1 = () => {
  const { gameStarted, setLoading, loading } = useGameStore((state) => ({
    gameStarted: state.gameStarted,
    setLoading: state.setLoading,
    loading: state.loading,
  }));

  useEffect(() => {
    setLoading(false);
    console.log("!");
  }, [loading]);

  if (!gameStarted) return null;

  return (
    <>
      <Scenario />
      <Player />
      {/* <MemoizedPlayer isPlaying={gameStarted} /> */}
    </>
  );
};
