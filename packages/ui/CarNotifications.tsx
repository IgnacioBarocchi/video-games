import { styled } from "styled-components";
import { Text } from "./elements/Text";
import { Panel } from "./elements/Panel";

type CarNotification = "HIT ZOMBIE" | "HIT BARRIER";

const Icon = styled.div<{ notificationType: CarNotification }>`
  width: 50px;
  height: 50px;
  border: 3px solid red;
  border-radius: 4px;
  position: absolute;
  left: 5%;
  bottom: 10%;
`;
const Content = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  padding: 2em;
  align-items: flex-end;
`;

//<Icon notificationType={notification} />;
export const CarNotifications = ({ notification }) => {
  if (!notification) {
    return null;
  }

  return (
    <Panel>
      <Content>
        <Text>$ -{notification.cost}</Text>
      </Content>
    </Panel>
  );
};
