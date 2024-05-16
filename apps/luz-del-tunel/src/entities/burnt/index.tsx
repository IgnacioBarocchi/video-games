import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { BurntCarModel1 } from "./models/BurntCar1";
import { BurntCarModel2 } from "./models/BurntCar2";
import { BurntCarModel3 } from "./models/BurntCar3";
import { FC, useState } from "react";
import { PositionalAudio } from "@react-three/drei";
import hitSound from "../../assets/audio/in-game-sfx/burnt-car/burnt-car-hit.mp3";
import scrapeSound from "../../assets/audio/in-game-sfx/burnt-car/burnt-car-scrape.mp3";
import { payloadIsThePlayer } from "../../lib/rigibBodyHelper";
import { CAR_IMPACT_COST } from "game-constants";
import useGameStore from "../../store/store";

export const BurntCar: FC<{ position: [number, number, number] }> = ({
  position,
}) => {
  const [playHitSound, setPlayHitSound] = useState(false);
  const [playScrapeSound, setPlayScrapeSound] = useState(false);
  const burntCarModelID = Math.floor(Math.random() * (3 - 1) + 1);
  const { setCarNotification, subMoney } = useGameStore((gameState) => ({
    subMoney: gameState.subMoney,
    setCarNotification: gameState.setCarNotification,
  }));

  return (
    <RigidBody
      name="Burnt Car"
      mass={2000}
      density={1000}
      friction={10}
      restitution={0.1}
      position={position}
      rotation={[0, 0, Math.random()]}
    >
      <CuboidCollider
        name="Burnt Car"
        args={[3, 2.2, 5.5]}
        position={[0, 2.2, 0.2]}
        restitution={0}
        onContactForce={(payload) => {
          if (
            payload.other?.rigidBodyObject?.name === "Ground" &&
            playHitSound
          ) {
            setPlayScrapeSound(true);
          }
        }}
        onCollisionEnter={(payload) => {
          if (payloadIsThePlayer(payload)) {
            setPlayHitSound(true);
            setCarNotification({ type: "HIT CAR", cost: CAR_IMPACT_COST });
            subMoney(CAR_IMPACT_COST);
          }
        }}
      />
      {burntCarModelID === 1 && <BurntCarModel1 scale={1.2} />}
      {burntCarModelID === 2 && <BurntCarModel2 scale={1.2} />}
      {burntCarModelID === 3 && <BurntCarModel3 scale={1.2} />}
      {playHitSound && (
        <PositionalAudio
          autoplay
          loop={false}
          distance={20}
          url={hitSound}
          onEnded={() => setPlayHitSound(false)}
        />
      )}
      {playScrapeSound && (
        <PositionalAudio
          autoplay
          loop={false}
          distance={20}
          url={scrapeSound}
          onEnded={() => setPlayScrapeSound(false)}
        />
      )}
    </RigidBody>
  );
};
