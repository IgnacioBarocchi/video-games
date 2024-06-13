// ! do not lazy load this one
import { LoadingScreen } from "ui";
import useCarGameStore from "../../../../store/store";

export const LoadingPanel = () => {
  const loading = useCarGameStore((state) => state.loading);

  if (loading) {
    return <LoadingScreen subject="Jugador" />;
  }

  return null;
};
