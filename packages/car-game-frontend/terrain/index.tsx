import { Bank } from "./parts/bank/Bank";
import { Barriers } from "./parts/barriers/barriers";
import { Checkpoint } from "./parts/checkpoint/checkpoint";
import { HighWay } from "./parts/highway";
// ! build error
/*
import { wrap } from "react-worker-components";
import { Suspense } from "react";
*/

import { Signs } from "./parts/signs/signs";
import { Trees } from "./parts/trees/trees";

// ! build error
/*
const DoodadsWorker = new Worker(new URL("./doodads.worker", import.meta.url));

const Doodads = wrap(() => DoodadsWorker);
*/

const Entities = () => {
  return (
    <>
      <Bank />
      <Checkpoint />
    </>
  );
};

const GreenArea = () => {
  return (
    <>
      <Signs />
      <Trees />
    </>
  );
  // ! build error
  /*
  return (
    <>
      <Suspense
        fallback={
          <>
            <Signs />
            <Trees />
          </>
        }
      >
        <Doodads />
      </Suspense>
    </>
    );
    */
};

export const Terrain = () => {
  return (
    <>
      <HighWay />
      <Entities />
      <Barriers />
      <GreenArea />
    </>
  );
};
