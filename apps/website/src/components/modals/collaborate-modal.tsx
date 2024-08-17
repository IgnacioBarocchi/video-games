import { Colors } from "game-constants";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, Modal } from "ui";
import { devices } from "ui/constants/devices";
import { Heading, Paragraph } from "ui/utilities";
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

export const CollaborateModal = () => {
  const [modalIsOpen, setmodalIsOpen] = useState(false);

  useEffect(() => {
    let timeoutId: number;

    timeoutId = setTimeout(() => {
      setmodalIsOpen(true);
    }, 20000);

    return () => clearTimeout(timeoutId);
  });

  return (
    <Modal isOpen={modalIsOpen} onClose={() => {}}>
      <ContentContainer>
        <Heading size="1">ESTE PROYECTO NECESITA AYUDA</Heading>

        <Paragraph>
          * Si conocés a alguien que pueda aportar sonido, música, arte 2D/3D, o
          si podés contribuir con el código, escribime por instagram
          <a href="https://www.instagram.com/ignacio_barocchi/" target="_blank">
            {"  @igancio_barocchi "}
          </a>
          (todavía el proyecto no tiene una comunidad online).
        </Paragraph>
        <Paragraph>
          * Las harramientas que se usaron para desarrollar el juego son
          Electron, React, TypeScript, Three-Fiber-Drei y Rapier.
        </Paragraph>
        <Paragraph>
          * Para el contenido gráfico se usó Blender y Mixamo.
        </Paragraph>
        <Paragraph>
          * Los sonidos utilizados son dominio público y de diversas fuentes.
        </Paragraph>
        <hr />
        <Paragraph>Entre las tareas más prioritarias están:</Paragraph>
        <Paragraph>
          * Diseñar e implementar sonidos coherentes con los gráficos del juego
        </Paragraph>
        <Paragraph>
          * Tener una propuesta gráfica justificada con algún moodboard, paleta
          de colores, etc.
        </Paragraph>
        <Paragraph>
          * Migrar la app de electron a
          <a href="https://www.tauri.app/" target="_blank">
            {"  tauri "}
          </a>
          para reducir significativamente el peso
        </Paragraph>
        <Paragraph>
          * Configurar vite para poder general bundles con web workers
          implementados por{" "}
          <a href="https://github.com/GoogleChromeLabs/coma/" target="_blank">
            {"  Comlik "}
          </a>
        </Paragraph>
        <Paragraph>Optimizar modelos 3D </Paragraph>
        <Paragraph>
          * Subir todos los archivos gráficos 3D y 2D a la plataformas gratuitas
          (probablemente usando en la nube
          <a
            href="https://docs.github.com/en/rest/gists?apiVersion=2022-11-28"
            target="_blank"
          >
            {"  gists "}
          </a>
          )
        </Paragraph>
      </ContentContainer>
    </Modal>
  );
};
