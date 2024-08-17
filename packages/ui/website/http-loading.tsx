import { MdOutlineDownloading } from "react-icons/md";
import { Paragraph } from "../utilities";
import { memo } from "react";

export const HttpLoading = memo(() => {
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <MdOutlineDownloading />
      <Paragraph>Obteniendo información sobre archivos</Paragraph>
    </div>
  );
});
