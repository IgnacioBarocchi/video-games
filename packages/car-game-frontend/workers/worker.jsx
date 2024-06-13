import { render } from "@react-three/offscreen";
import { Plane } from "@react-three/drei";
import { useEffect } from "react";
import { LVL1 } from "../levels";

const TestCMP = () => {
  alert("x");
  useEffect(() => {
    alert("INSIDE THE WORKER COMPONENT");
  }, []);

  return (
    <Plane args={[1, 1]}>
      <meshBasicMaterial color="red" />
    </Plane>
  );
};

render(<LVL1 />);
