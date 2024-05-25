import { SignModel } from "./model/Sign";

export const Signs = () => {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <SignModel key={i} position={[0, 0, i * -500]} />
      ))}
    </>
  );
};
