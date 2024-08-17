import { InfoAlert } from "ui";
import useCarGameStore from "../../../../store/store";

export const TitlePanel = () => {
  const title = useCarGameStore((state) => state.title);
  return <InfoAlert title={title} />;
};

export default TitlePanel;
