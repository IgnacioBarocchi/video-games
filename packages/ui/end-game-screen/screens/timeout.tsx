import styled from "styled-components";
import { Text } from "../../elements/Text";

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const Report = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

const Item = styled.div`
  font-size: 4em;
  font-weight: 1000;
  -webkit-text-stroke: 3px black;
`;

export const Timeout = () => {
  return (
    <>
      <Text>Misión fracasada</Text>
      <Text>Se acabó el tiempo</Text>
    </>
  );
  // return (
  //   <Box>
  //     <Report>
  //       <Item>Misión fracasada</Item>
  //       <Item>Se acabó el tiempo</Item>
  //     </Report>
  //   </Box>
  // );
};
