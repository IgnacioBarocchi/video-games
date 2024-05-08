import { Text } from "./elements/Text";

export const CarNotifications = ({ notification }) => {
  if (!notification) {
    return null;
  }

  return <Text>$ -{notification.cost}</Text>;
};
