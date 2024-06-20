import { render } from "@react-three/offscreen";
import { useEffect } from "react";
import LVL1 from "../levels";

const WorkerCMP = () => {
  useEffect(() => {
    alert("web worker");
  }, []);

  return <LVL1 />;
};

render(<WorkerCMP />);
