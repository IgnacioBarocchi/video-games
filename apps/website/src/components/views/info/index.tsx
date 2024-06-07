import { Text } from "ui/elements/Text";
import { BookScene } from "../../book-scene";
import { BoxScene } from "../../box-scene";
import { CoinsScene } from "../../coins-scene";
import { CustomCard } from "../../custom-card";
import { Footer } from "../../footer";
import { Section } from "../../parallax-section";
import { FlexRow } from "ui";
import { styled } from "styled-components";
import image from "../../../assets/images/BG2.png";
import { Modal } from "../../modals/modal";
import { createPortal } from "react-dom";
import { useReducer } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterText = styled.div`
  font-family: Technor;
  font-size: 50px;
  margin-left: 25px;
  @media (max-width: 768px) {
    font-size: 30px;
    margin-left: 0;
  }
`;

const InfoSection = styled(Section)`
  @media (max-width: 768px) {
    padding: 100px 0;
    background: green;
  }
`;

const CustomRow = styled(FlexRow)`
  @media (max-width: 768px) {
    height: ${({ heights }) => heights.mobile};
    flex-direction: column;
    gap: 100px;
    padding: 100px 0;
  }
`;

const HistoryContent = () => {
  return <>PANTALLA DE HISTORIA EN CONSTRUCCIÓN</>;
};

const ArchiveContent = () => {
  return <>PANTALLA DE ARCHIVO EN CONSTRUCCIÓN</>;
};

const DonationsContent = () => {
  return <>PANTALLA DE DONACIONES EN CONSTRUCCIÓN</>;
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
            <CustomCard title="Historia" Scene={() => <BookScene />} />
          </div>
          <div onClick={() => dispatch({ type: actionTypes.SHOW_ARCHIVE })}>
            <CustomCard title="Archivo" Scene={() => <BoxScene />} />
          </div>
          <div onClick={() => dispatch({ type: actionTypes.SHOW_DONATIONS })}>
            <CustomCard title="Donaciones" Scene={() => <CoinsScene />} />
          </div>
        </CustomRow>
      </InfoSection>
      <Footer>
        <FooterText hideStroke={true}>Creado por Ignacio Barocchi</FooterText>
      </Footer>
      {createPortal(
        <Modal
          isOpen={state.modalContent !== null}
          onClose={() => dispatch({ type: actionTypes.CLOSE_MODAL })}
        >
          {state.modalContent}
        </Modal>,
        document.body
      )}
    </Container>
  );
};
