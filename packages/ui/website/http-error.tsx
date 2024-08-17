import { MdError } from "react-icons/md";
import { Paragraph } from "../utilities";
import { memo } from "react";

export const HTTPError = memo(() => {
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <MdError />
      <Paragraph>Error al obtener información sobre archivos</Paragraph>
    </div>
  );
});
