import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { Modal } from "./modal";
import { styled } from "styled-components";

const Title = styled.h1`
  font-size: 75px;
  font-family: Technor;
  @media (max-width: 768px) {
    font-size: 50px;
  }
`;

const P = styled.p`
  font-size: 25px;
  font-family: Supreme;
  @media (max-width: 768px) {
    font-size: 20px;
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
    <>
      {createPortal(
        <Modal isOpen={modalIsOpen} onClose={() => {}}>
          <div style={{ width: "75%" }}>
            <Title>ESTE PROYECTO NECESITA AYUDA</Title>
            <P>
              * Si conocés a alguien que pueda aportar sonido, música, arte
              2D/3D, o si podés contribuir con el código, revisá la comunidad en
              Reddit. Para contribuir económicamente
            </P>
            <P>
              * Las harramientas que se usaron para desarrollar el juego son
              lectron, React, TypeScript, Three-Fiber-Drei y Rapier.
            </P>
            <P>* Para el contenido gráfico se usó Blender y Mixamo.</P>
            <P>
              * Los sonidos utilizados son dominio público y de diversas
              fuentes.
            </P>
          </div>
        </Modal>,
        document.body
      )}
    </>
  );
};
