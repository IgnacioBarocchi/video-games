import { Layer } from "react-parallax-scroll";
import AOS from "aos";
import "aos/dist/aos.css";
import { Text } from "ui/elements/Text";
import picture from "../../assets/images/BG4.png";
import { Colors } from "../../constants";
import { useEffect } from "react";
import video2 from "../../assets/video/v2.mp4";

const CONTAINER_WIDTH = 1648;
const VIDEO_WIDTH = CONTAINER_WIDTH / 1.25;
const IMAGE_WIDTH = CONTAINER_WIDTH - VIDEO_WIDTH;
const ASPECT_RATIO = 16 / 9;
const CONTAINER_HEIGHT = VIDEO_WIDTH / ASPECT_RATIO;

const CopyText = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        display: "flex",
        flexDirection: "column",
        padding: "25px",
      }}
    >
      <Text>No tenés futuro</Text>
      <p>
        En un mundo devastado por un apocalipsis zombie, tu misión es simple
        pero desafiante: ¡sobrevivir! Viaja a través de la provincia de Buenos
        Aires enfrentando peligros en cada esquina. Tu vehículo es tu mayor
        aliado y deberás cuidarlo como a tu propia vida. [texto por ChatGPT]
      </p>
    </div>
  );
};

// height: " calc(100% + 25px + 25px)",

const Image = () => (
  <div
    style={{
      position: "relative",
      height: "100%",
      width: `${IMAGE_WIDTH}px`,
    }}
  >
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        zIndex: 50,
        background: `linear-gradient(0deg, #630B0F 1%, rgba(255,255,255, 0) 20%)`,
      }}
    ></div>
    <Layer
      settings={{ speed: 0.3, type: "backgroundY" }}
      data-aos-delay="5000"
      data-aos="fade-up"
      style={{
        background: "#370508",
        display: "flex",
        alignItems: "flex-end",
        width: "100%",
        height: "100%",
        backgroundImage: `url("${picture}")`,
        backgroundSize: "120%",
        position: "absolute",
        top: 0,
      }}
    />
  </div>
);

export const LandingContent = () => {
  useEffect(() => {
    AOS.init({
      offset: 500,
      delay: 0,
      duration: 3000,
      easing: "ease",
      once: false,
      anchorPlacement: "top-bottom",
    });
  }, []);

  return (
    <div
      style={{
        width: `${CONTAINER_WIDTH}px`,
        height: `${CONTAINER_HEIGHT}px`,
        display: "flex",
        border: `1px solid ${Colors.darkGrey}`,
      }}
    >
      <Image />
      <div
        data-aos="fade-down"
        data-aos-delay="5000"
        style={{
          background: Colors.richBlack,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div style={{ width: `${VIDEO_WIDTH}px`, position: "relative" }}>
          <CopyText />
          <video
            onLoadedData="this.play();this.muted=true;"
            // poster="https://durian.blender.org/wp-content/themes/durian/images/void.png"
            autoPlay={true}
            playsinline={true}
            loop={true}
            muted={true}
            controls={false}
            width="100%"
          >
            <source src={video2} type="video/mp4" />
            Your browser does not support the video tag or the file format of
            this video.
          </video>
        </div>
      </div>
    </div>
  );
};

/*
// import "~video-react/dist/video-react.css";
// import { Player } from "video-react";
import { Layer } from "react-parallax-scroll";
import AOS from "aos";
import "aos/dist/aos.css";
import { Text } from "ui/elements/Text";
import picture from "../../assets/images/BG4.png";
import { Colors } from "../../constants";
import { Suspense, useEffect } from "react";
import video from "../../assets/video/demo.webm";
import video2 from "../../assets/video/v2.mp4";

export const LandingContent = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      style={{
        width: "1080px",
        height: "70%",
        display: "flex",
      }}
    >
      <div
        style={{
          position: "relative",
          height: " calc(100% + 25px + 25px)",
          width: "50%",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            zIndex: 50,
            background: `linear-gradient(0deg, #630B0F 1%, rgba(255,255,255, 0) 20%)`,
          }}
        ></div>
        <Layer
          settings={{ speed: 0.3, type: "backgroundY" }}
          data-aos="fade-up"
          style={{
            background: "#370508",
            display: "flex",
            alignItems: "flex-end",
            width: "100%",
            height: "100%",
            backgroundImage: `url("${picture}")`,
            backgroundSize: "120%",
            position: "absolute",
            top: 0,
          }}
        />
      </div>
      <div
        data-aos="fade-down"
        style={{
          background: Colors.richBlack,
          padding: "25px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text>No tenés futuro</Text>
          <p>
            En un mundo devastado por un apocalipsis zombie, tu misión es simple
            pero desafiante: ¡sobrevivir! Viaja a través de la provincia de
            Buenos Aires enfrentando peligros en cada esquina. Tu vehículo es tu
            mayor aliado y deberás cuidarlo como a tu propia vida. [texto por
            ChatGPT]
          </p>
        </div>
        <div style={{ width: "300px", background: "red" }}>
          <video
            autoplay="autoplay"
            onloadeddata="this.play();this.muted=true;"
            poster="https://durian.blender.org/wp-content/themes/durian/images/void.png"
            playsinline
            loop
            muted
            controls={false}
            width="100%"
          >
            <source src={video2} type="video/mp4" />
            Your browser does not support the video tag or the file format of
            this video.
          </video>
        </div>
      </div>
    </div>
  );
};

*/
