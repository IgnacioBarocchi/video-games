import { CustomCanvas } from "../custom-canvas";
import { Book3dModel } from "./book-3d-model";

export const BookScene = () => {
  return (
    <CustomCanvas>
      <Book3dModel />
    </CustomCanvas>
  );
};
