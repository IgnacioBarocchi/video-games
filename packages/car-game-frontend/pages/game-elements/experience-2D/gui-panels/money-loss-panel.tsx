import { FloatingNotification } from "ui";
import { Text } from "ui/elements/Text";

import useCarGameStore from "../../../../store/store";

export const MoneyLossPanel = () => {
  const { carNotification } = useCarGameStore();

  return (
    <FloatingNotification dismiss={false} position="bottom-left">
      <Text> {carNotification?.cost && `- ${carNotification.cost} ARS`} </Text>
    </FloatingNotification>
  );
};

export default MoneyLossPanel;
