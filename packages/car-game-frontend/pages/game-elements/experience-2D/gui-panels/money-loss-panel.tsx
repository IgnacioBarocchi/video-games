import { MoneyAlert } from "ui/game-gui";
import useCarGameStore from "../../../../store/store";

export const MoneyLossPanel = () => {
  const { carNotification, money, gameOver } = useCarGameStore((state) => ({
    carNotification: state.carNotification,
    money: state.money,
    gameOver: state.gameOver,
  }));

  return (
    <MoneyAlert
      visible={!gameOver?.reason}
      total={money}
      loss={carNotification?.cost}
      reason={carNotification?.type}
      combo={carNotification?.count > 1 ? carNotification.count : null}
    />
  );
};

export default MoneyLossPanel;
