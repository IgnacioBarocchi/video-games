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

const Scenario = memo(({ setWonTheGame }) => {
  return (
    <>
      <Ground setWonTheGame={setWonTheGame} />
      <Barriers isOldVersion={isOldVersion} />
      <Zombies
        startZOffset={900}
        Zend={1900}
        numberOfZombies={50}
        isOldVersion={isOldVersion}
      />
      <BurntCars isOldVersion={isOldVersion} />
      <Signs isOldVersion={isOldVersion} />
      <Trees isOldVersion={isOldVersion} />
    </>
  );
});

export const LVL1 = ({ setWonTheGame }) => {
  const { gameStarted, setLoading, loading } = useGameStore((state) => ({
    gameStarted: state.gameStarted,
    setLoading: state.setLoading,
    loading: state.loading,
  }));

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  if (!gameStarted) return null;

  return (
    <>
      <Scenario setWonTheGame={setWonTheGame} />
      <Player />
      {/* <MemoizedPlayer isPlaying={gameStarted} /> */}
    </>
  );
};
