import { Layer } from "react-parallax-scroll";
import AOS from "aos";
import "aos/dist/aos.css";
import { Text } from "ui/elements/Text";
import picture from "../../assets/images/BG4.png";
import { Colors } from "../../constants";
import { Suspense, useEffect } from "react";

export const LandingContent = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      style={{
        width: "70%",
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
        <Suspense
          fallback={<div>AAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</div>}
        >
          <iframe
            data-aos="fade-up-left"
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/tgbNymZ7vqY"
          ></iframe>
        </Suspense>
      </div>
    </div>
  );
};
