import { expose } from "react-worker-components";
import { Signs } from "./parts/signs/signs";
import { Trees } from "./parts/trees/trees";

const DoodadsWorker = () => {
  return (
    <>
      <Signs />
      <Trees />
    </>
  );
};

expose(DoodadsWorker);
