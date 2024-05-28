import { useContext } from "react";
import { MainContext } from "../providers/main-context-provider";

const useGameContext = () => {
  return useContext(MainContext);
};

export default useGameContext;
