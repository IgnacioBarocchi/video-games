import { memo, useEffect } from "react";
import { signal } from "@preact/signals-react";
import { Heading, Paragraph } from "../utilities";
import { Box } from "../utilities/box2";

const transitionTime = 5_000;
const quotes = [
  {
    text: "Está re bueno el ruidito de cuando pisa al zombie",
    author: "Un amigo",
  },
  {
    text: "Los gráficos no son importantes si el juego es bueno",
    author: "Otro amigo",
  },
  {
    text: "Los controles y la física se sienten bien",
    author: "Otro amigo",
  },
  {
    text: "Me anda bastante bug jeje",
    author: "Otro amigo",
  },
  {
    text: "El juego está muy bueno",
    author: "Chat GPT",
  },
  {
    text: "Jajaja corte Carmageddon",
    author: "Otro amigo",
  },
];

const paddingValue = 25;
const settings = {
  width: `calc(100vw - ${paddingValue}px)`,
  alignment: "center",
  direction: "vertical",
  st: { padding: `${paddingValue}px 0` },
};

export const Accreditations = memo(() => {
  const quotesIndex = signal(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      quotesIndex.value = (quotesIndex.value + 1) % quotes.length;
    }, transitionTime);

    return () => clearInterval(intervalId);
  }, [quotes.length]);

  return (
    <Box.Web {...settings}>
      <Heading index="3" font="Tanker">
        "{quotes[quotesIndex.value].text}"
      </Heading>
      <Paragraph font="Supreme">-{quotes[quotesIndex.value].author}</Paragraph>
    </Box.Web>
  );
});
