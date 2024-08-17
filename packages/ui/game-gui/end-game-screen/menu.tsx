import { block } from "million/react";
import { Button } from "../../utilities";
import { Box } from "../../utilities/box2";

export const BackToMenuPanel = block(({ onBackToMenu, visible }) => {
  return (
    <Box.Snapped
      visible={visible}
      place="bottom-center"
      width="75vw"
      justification="space-between"
      pointerEvents="all"
    >
      <Button
        font="Technor"
        skin="dark"
        onClick={onBackToMenu}
        label="Volver al menú"
      />
      <Button
        font="Technor"
        skin="dark"
        onClick={() => window.close()}
        label="Salir"
      />
    </Box.Snapped>
  );
});
