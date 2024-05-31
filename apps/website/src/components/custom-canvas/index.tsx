import { Canvas } from "@react-three/fiber";

export const CustomCanvas = ({ children }) => {
  return (
    <Canvas
      mode={"concurrent"}
      flat
      dpr={[0.2, 1]}
      performance={{ min: 0.2 }}
      frameloop={"always"}
      shadows={false}
      gl={{
        logarithmicDepthBuffer: true,
        precision: "lowp",
        powerPreference: "high-performance",
      }}
      camera={{
        fov: 35,
        near: 0.1,
        far: 200,
        position: [0, 2, -3],
        zoom: 1.25,
      }}
    >
      {children}
    </Canvas>
  );
};
