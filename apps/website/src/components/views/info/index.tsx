import { Text } from "ui/elements/Text";
import { BookScene } from "../../book-scene";
import { BoxScene } from "../../box-scene";
import { CoinsScene } from "../../coins-scene";
import { CustomCard } from "../../custom-card";
import { Footer } from "../../footer";
import { Section } from "../../parallax-section";
import { FlexRow } from "ui";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Info = () => {
  return (
    <Container>
      <Section preset="2" heights={{ desktop: "100vh", mobile: "fit-content" }}>
        <FlexRow heights={{ desktop: "100vh", mobile: "fit-content" }}>
          <CustomCard title="Historia" Scene={() => <BookScene />} />
          <CustomCard title="Archivo" Scene={() => <BoxScene />} />
          <CustomCard title="Donaciones" Scene={() => <CoinsScene />} />
        </FlexRow>
      </Section>
      <Footer>
        <Text hideStroke={true}>Creado por Ignacio Barocchi</Text>
      </Footer>
    </Container>
  );
};
