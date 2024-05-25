import { forwardRef } from 'react';
import { AttachmentReferences } from '.';
import { PositionalAudio } from '@react-three/drei';
import carEngine from '../assets/audio/in-game-sfx/car/car-engine-running.m4a';
import drivingOnAsphalt from '../assets/audio/on_asphalt.mp3';
import drivingOnSnow from '../assets/audio/on_snow.m4a';

export const Attachments = forwardRef<{}, AttachmentReferences>(
  (_, attachmentReferences) => {
    return (
      <>
        <PositionalAudio
          url={carEngine}
          autoplay
          loop
          ref={attachmentReferences.current?.audio.carEngine}
        />
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
      </>
    );
  },
);

/* <PositionalAudio
ref={attachmentReferences.current?.audio.music}
url={music}
autoplay
distance={5}
/> * LG  <pointLight
name='Reactive music light'
ref={attachmentReferences.current?.lights.bottomLight}
position={[0, 1, 0]}
color='magenta'
/>  <pointLight
name='Left back light'
position={[-1.5, 2.05, -4.4]}
color='yellow'
intensity={0}
// intensity={0.05}
/>
<pointLight
name='Right back light'
position={[1.5, 2.05, -4.4]}
color='yellow'
intensity={0}
// intensity={0.05}
/>  <pointLight
name='Left stop light'
ref={attachmentReferences.current.lights.leftStopLight}
position={[-1.5, 2, -4.4]}
color='red'
intensity={0}
/>
<pointLight
name='Right stop light'
ref={attachmentReferences.current.lights.rightStopLight}
position={[1.5, 2, -4.4]}
color='red'
intensity={0}
/>
<pointLight
name='Left front light'
castShadow
intensity={1.5}
power={10}
position={[-1.5, 0, 20]}
color={new Color(246, 205, 139)}
/>
<pointLight
name='Right front light'
castShadow
intensity={1.5}
power={10}
position={[1.5, 0, 20]}
color={new Color(246, 205, 139)}
/> 
<Rain /> */
