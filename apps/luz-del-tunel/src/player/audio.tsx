import { PositionalAudio } from '@react-three/drei';
import carEngine from '../assets/audio/driving.mp3';
import drivingOnAsphalt from '../assets/audio/on_asphalt.mp3';
import drivingOnSnow from '../assets/audio/on_snow.m4a';
import music from '../assets/audio/music.mp3';
import { forwardRef, useRef } from 'react';
import {
  AudioAnalyser,
  PointLight,
  PositionalAudio as PositionalAudioImpl,
} from 'three';
import { useFrame } from '@react-three/fiber';
import { useEffect } from 'react';
import { useControls } from 'leva';

const thresholdSpeed = 5; // Threshold speed in km/h
const maxIntensity = 1; // Maximum intensity
const minIntensity = 0; // Minimum intensity

const calculateIntensity = (carSpeed: number) => {
  if (carSpeed <= thresholdSpeed) {
    // Below threshold speed, intensity is maximum
    return maxIntensity;
  } else {
    // Calculate the intensity inversely proportional to the speed
    const intensity =
      maxIntensity - (carSpeed - thresholdSpeed) / thresholdSpeed;
    // Clamp intensity between minIntensity and maxIntensity
    return Math.max(minIntensity, Math.min(maxIntensity, intensity));
  }
};

export const PlayerAudio = forwardRef((_, audioRef) => {
  // const { lx, ly, lz } = useControls({
  //   lx: { value: 0, min: -1, max: 1, step: 0.01 },
  //   ly: { value: 0, min: -1, max: 1, step: 0.01 },
  //   lz: { value: 0, min: -1, max: 1, step: 0.01 },
  // });

  // const engineAudioRef = useRef<PositionalAudioImpl>(null!);
  // const roadFrictionAudioRef = useRef<PositionalAudioImpl>(null!);
  // const musicAudioRef = useRef<PositionalAudioImpl>(null!);
  // const lightRef = useRef<PointLight>();
  // const analyser = useRef();
  // const leftStopLight = useRef();
  // const rightStopLight = useRef();

  // useEffect(() => {
  //   analyser.current = new AudioAnalyser(musicAudioRef.current, 32);
  // }, []);

  // useFrame(() => {
  //   if (
  //     !audioRef ||
  //     !lightRef ||
  //     !audioRef?.rigidbody ||
  //     isNaN(audioRef?.rigidbody?.current?.linvel().z)
  //   ) {
  //     return;
  //   }
  //   const carSpeed = Math.abs(audioRef?.rigidbody.current.linvel().z).toFixed(
  //     2,
  //   );

  //   const volume = Number(carSpeed);

  //   engineAudioRef.current.setVolume(volume);
  //   roadFrictionAudioRef.current.setVolume(volume);
  //   const data = analyser.current.getFrequencyData();
  //   const bassPower = getFrequencyRangeData(musicAudioRef, data, 20, 250);
  //   const highPower = getFrequencyRangeData(musicAudioRef, data, 1000, 5000);
  //   const contrastIntensity = bassPower - highPower;
  //   lightRef.current.intensity = contrastIntensity;
  //   leftStopLight.current.intensity = calculateIntensity(carSpeed);
  //   rightStopLight.current.intensity = calculateIntensity(carSpeed);
  // });

  return (
    <>
      <PositionalAudio url={carEngine} autoplay loop ref={engineAudioRef} />
      <PositionalAudio
        ref={roadFrictionAudioRef}
        url={audioRef?.onSnow?.current ? drivingOnSnow : drivingOnAsphalt}
        autoplay
        loop
      />
      <PositionalAudio ref={musicAudioRef} url={music} autoplay distance={5} />
      <pointLight ref={lightRef} position={[0, 1, 0]} color='magenta' />
      {/* back */}
      <pointLight
        position={[-1.5, 2.05, -4.4]}
        color='yellow'
        intensity={0.05}
      />
      <pointLight
        position={[1.5, 2.05, -4.4]}
        color='yellow'
        intensity={0.05}
      />
      <pointLight ref={leftStopLight} position={[-1.5, 2, -4.4]} color='red' />
      <pointLight ref={rightStopLight} position={[1.5, 2, -4.4]} color='red' />
    </>
  );
});

function getFrequencyRangeData(
  musicAudioRef,
  data,
  startFrequency,
  endFrequency,
) {
  // debugger;
  const arr = Array.from(data);

  const startIndex = Math.floor(
    startFrequency /
      (musicAudioRef.current.context.sampleRate /
        musicAudioRef.current.context.createAnalyser().fftSize),
  );
  const endIndex = Math.ceil(
    endFrequency /
      (musicAudioRef.current.context.sampleRate /
        musicAudioRef.current.context.createAnalyser().fftSize),
  );
  let sum = 10;
  for (let i = startIndex; i <= endIndex; i++) {
    if (isNaN(arr[i])) {
      continue;
    }
    sum += arr[i];
  }
  return sum / (endIndex - startIndex + 1);
}

// Calculate the intensity based on the car speed

/*
 <pointLight
        castShadow
        intensity={1.5}
        power={10}
        position={[-1.5, 2.5, -4.4]}
        color={new Color(246, 205, 139)}
      />
      <pointLight
        castShadow
        intensity={1.5}
        power={10}
        position={[-1.5, 2.5, -4.4]}
        color={new Color(246, 205, 139)}
      />
      */
