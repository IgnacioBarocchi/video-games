import { FloatingNotification } from "ui";
import { Title } from "ui/elements/Text";
import useCarGameStore from "../../../../store/store";

export const TitlePanel = () => {
  const title = useCarGameStore((state) => state.title);

  if (title) {
    return (
      <FloatingNotification dismiss={false} position="top-center" width="75%">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Title>{title}</Title>
        </div>
      </FloatingNotification>
    );
  }

  return null;
};

export default TitlePanel;
