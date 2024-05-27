import { MutableRefObject, forwardRef } from "react";
import { PositionalAudio } from "@react-three/drei";
import { PositionalAudioProps } from "@react-three/fiber";
import carEngineIdle from "../../assets/audio/car/car-engine-idle.m4a";
import carEngineRunning from "../../assets/audio/car/car-engine-running.m4a";

export const Attachments = forwardRef<
  {},
  MutableRefObject<PositionalAudioProps>
>((_, attachmentReferences) => {
  return (
    <>
      <PositionalAudio
        url={carEngineIdle}
        autoplay
        loop
        ref={attachmentReferences}
      />
      <PositionalAudio
        url={carEngineRunning}
        autoplay
        loop
        ref={attachmentReferences}
      />
    </>
  );
});

/* 
<PositionalAudio
    ref={attachmentReferences.current?.audio.drivingOnSurface}
    url={
      attachmentReferences.current?.isOverSnow
        ? drivingOnSnow
        : drivingOnAsphalt
    }
    autoplay
    loop
/> 
*/
