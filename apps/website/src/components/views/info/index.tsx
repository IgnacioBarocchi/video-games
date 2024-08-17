import { BoxScene } from "../../scene-3d/box-scene";
import { Footer } from "../../footer";
import { Section } from "../../parallax-section";
import { Card3D, FlexRow, Modal } from "ui";
import { styled } from "styled-components";
import image from "../../../assets/images/BG2.png";
import { useReducer } from "react";
import { BookScene } from "../../scene-3d/book-scene";
import { CoinsScene } from "../../scene-3d/coins-scene";
import { Colors } from "game-constants";
import { Paragraph } from "ui/utilities/paragraph";
import { devices } from "ui/constants/devices";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoSection = styled(Section)`
  @media (max-width: 768px) {
    padding: 100px 0;
    background: green;
  }
`;

const CustomRow = styled(FlexRow)`
  @media (max-width: 576px) {
  }
  @media (max-width: 992px) {
  }
  @media (max-width: 1200px) {
  }
  @media (max-width: 768px) {
    height: ${({ heights }) => heights.mobile};
    flex-direction: column;
    gap: 100px;
    padding: 100px 0;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 25px;
  width: 50%;
  background: ${Colors.richBlack};
  @media only screen and ${devices.md} {
    width: 100%;
  }
`;

const HistoryContent = () => {
  return (
    <ContentContainer>
      <Paragraph>
        El pueblo argentino enfrenta una vez más una súper crisis. Esta vez, el
        gobierno ha declarado el estado de emergencia debido a una invasión
        masiva de zombies, una situación que desafía cualquier previsión y que
        ha sumido al país en una atmósfera de incertidumbre y temor.
      </Paragraph>
      <Paragraph>
        En un comunicado oficial emitido en la madrugada del domingo, las
        autoridades informaron sobre el brote que comenzó en el interior del
        país y que, en cuestión de horas, se extendió rápidamente hacia las
        grandes urbes. Las fuerzas de seguridad han sido desplegadas en las
        principales ciudades para contener el avance de los no-muertos, pero la
        situación sigue siendo crítica.
      </Paragraph>
      <Paragraph>
        Además de la amenaza directa que representan los zombies para la
        población, se espera que esta crisis desencadene una serie de
        consecuencias económicas devastadoras. Analistas prevén una
        hiperinflación en los próximos meses, agravada por el colapso de las
        cadenas de suministro y la paralización de numerosas actividades
        económicas. La capacidad de producción nacional se ha visto severamente
        comprometida, y la escasez de bienes esenciales ya se está haciendo
        sentir en varios puntos del país.
      </Paragraph>
      <Paragraph>
        La incertidumbre también se extiende al ámbito financiero. La creciente
        expansión en la brecha cambiaria es una señal de la desconfianza que
        reina entre los inversores y la ciudadanía en general. El dólar paralelo
        ha experimentado un alza significativa, y la cotización oficial no ha
        tardado en seguir esa tendencia, presionando aún más a un peso que ya
        venía debilitado.
      </Paragraph>
      <Paragraph>
        Mientras tanto, el gobierno se enfrenta al desafío de gestionar esta
        crisis multidimensional. Se ha convocado a una reunión de emergencia con
        líderes de distintos sectores para delinear un plan de acción integral
        que contemple tanto la contención de la amenaza zombie como las medidas
        económicas necesarias para estabilizar el país.
      </Paragraph>
      <Paragraph>
        En este momento de extrema dificultad, es vital que la sociedad
        argentina se mantenga unida y que cada ciudadano tome las precauciones
        necesarias para protegerse. La solidaridad y la responsabilidad
        colectiva serán claves para superar esta inédita y aterradora situación.
      </Paragraph>
      <Paragraph>
        El futuro es incierto, pero la historia ha demostrado que Argentina es
        un país resiliente. Con coraje y determinación, una vez más, el pueblo
        argentino se levantará frente a la adversidad.
      </Paragraph>
    </ContentContainer>
  );
};

const ArchiveContent = () => {
  return (
    <>
      <Paragraph>Están disponibles los builds antiguos para MacOS</Paragraph>
      <a>
        <Paragraph>Versión A0</Paragraph>
      </a>
      <a>
        <Paragraph>Versión A0.1</Paragraph>
      </a>
    </>
  );
};

const DonationsContent = () => {
  return (
    <Paragraph>Podés hacer tu donación a través de cafecito app</Paragraph>
  );
};

const actionTypes = {
  SHOW_HISTORY: "SHOW_HISTORY",
  SHOW_ARCHIVE: "SHOW_ARCHIVE",
  SHOW_DONATIONS: "SHOW_DONATIONS",
  CLOSE_MODAL: "CLOSE_MODAL",
};

// Define the initial state
const initialState = {
  modalContent: null,
};

// Create the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SHOW_HISTORY:
      return { modalContent: <HistoryContent /> };
    case actionTypes.SHOW_ARCHIVE:
      return { modalContent: <ArchiveContent /> };
    case actionTypes.SHOW_DONATIONS:
      return { modalContent: <DonationsContent /> };
    case actionTypes.CLOSE_MODAL:
      return { modalContent: null };
    default:
      return state;
  }
};

export const Info = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Container>
      <InfoSection
        image={image}
        heights={{ desktop: "100vh", mobile: "fit-content" }}
      >
        <CustomRow heights={{ desktop: "100vh", mobile: "fit-content" }}>
          <div onClick={() => dispatch({ type: actionTypes.SHOW_HISTORY })}>
            <Card3D title="Historia" Scene={() => <BookScene />} />
          </div>
          <div onClick={() => dispatch({ type: actionTypes.SHOW_ARCHIVE })}>
            <Card3D title="Archivo" Scene={() => <BoxScene />} />
          </div>
          <div onClick={() => dispatch({ type: actionTypes.SHOW_DONATIONS })}>
            <Card3D title="Donaciones" Scene={() => <CoinsScene />} />
          </div>
        </CustomRow>
      </InfoSection>
      <Footer />
      <Modal
        isOpen={state.modalContent !== null}
        onClose={() => dispatch({ type: actionTypes.CLOSE_MODAL })}
      >
        {state.modalContent}
      </Modal>
    </Container>
  );
};
