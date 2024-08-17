import { FaInstagram, FaGithub } from "react-icons/fa";
import { Heading } from "../utilities";
import { styled } from "styled-components";
import { Link } from "react-aria-components";
import { gap } from "../constants/gap";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${gap};
`;

const authorText = "Creado por Ignacio Barocchi";
export const ContactInfo = () => {
  return (
    <Container>
      {/* <Link href="https://www.instagram.com/ignacio_barocchi/">
        <FaInstagram size={35} />
      </Link>
      <Link href="https://www.github.com/ignacioBarocchi/">
        <FaGithub size={35} />
      </Link> */}
      <a href="https://www.instagram.com/ignacio_barocchi/">
        <FaInstagram size={35} />
      </a>
      <a href="https://www.github.com/ignacioBarocchi/">
        <FaGithub size={35} />
      </a>
      <Heading index="3">{authorText}</Heading>
    </Container>
  );
};
