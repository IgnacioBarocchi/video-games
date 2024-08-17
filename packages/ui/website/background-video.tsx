import { ToggleButton } from "react-aria-components";
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import { styled } from "styled-components";
import { Colors } from "game-constants";
import {
  RefObject,
  Suspense,
  VideoHTMLAttributes,
  forwardRef,
  memo,
  useCallback,
  useState,
} from "react";

const FullScreenVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const VignetteOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: radial-gradient(circle, transparent, ${Colors.richBlack} 70%);
`;

const Poster = styled.img`
  background: ${Colors.richBlack};
  height: 100vh;
  width: 100vw;
`;

const unsupportedVideoText = "Tu navegador no soporta este video.";

const settings = {
  autoPlay: true,
  playsInline: true,
  loop: true,
  muted: true,
  controls: false,
};

export type VideoRef = RefObject<VideoHTMLAttributes<HTMLVideoElement>>;

export interface BackgroundVideoProps {
  src: string;
  type: string;
  poster: string;
}

export const Player = forwardRef<VideoRef, BackgroundVideoProps>(
  ({ src, type, poster }, ref) => {
    return (
      <Suspense fallback={<Poster src={poster} alt="Póster del video" />}>
        <FullScreenVideo
          // @ts-ignore
          ref={ref}
          poster={poster}
          {...settings}
        >
          <source src={src} type={type} />
          {unsupportedVideoText}
        </FullScreenVideo>
        <VignetteOverlay />
      </Suspense>
    );
  }
);

// const PausePlayToggle = styled(ToggleButton)`
const PausePlayToggle = styled.button`
  font-size: 36px;
  border: 0;
  outline: none;
  background: transparent;
`;

export const Controls = forwardRef<VideoRef>(({}, ref) => {
  const [playerState, setPlayerState] = useState<{
    method: "play" | "pause";
    Icon: typeof FaPauseCircle | typeof FaPlayCircle;
  }>({
    method: settings.autoPlay ? "pause" : "play",
    Icon: settings.autoPlay ? FaPauseCircle : FaPlayCircle,
  });

  const toggleHandler = useCallback(() => {
    // @ts-ignore
    ref?.current[playerState.method]?.();

    setPlayerState((prev) => ({
      method: prev.method === "play" ? "pause" : "play",
      Icon: prev.method === "play" ? FaPauseCircle : FaPlayCircle,
    }));
  }, [
    // @ts-ignore
    ref?.current,
    playerState?.method,
  ]);

  return (
    <PausePlayToggle
      // @ts-ignore
      onClick={toggleHandler}
    >
      <playerState.Icon />
    </PausePlayToggle>
  );
});

export const BackgroundVideo = {
  Player: memo(Player),
  Controls: memo(Controls),
};
