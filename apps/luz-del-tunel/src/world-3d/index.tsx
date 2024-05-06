import { Canvas } from "@react-three/fiber";

export const World3D = ({ children }) => {
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
        fov: 45,
        near: 0.1,
        far: 200,
        position: [10, 10, 20],
      }}
    >
      {children}
    </Canvas>
  );
};
