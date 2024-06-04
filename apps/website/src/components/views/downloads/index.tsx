import { styled } from "styled-components";
import { CustomCard } from "../../custom-card";
import { MacOScene } from "../../mac-scene";
import { Section } from "../../parallax-section";
import { TuxScene } from "../../tux-scene";
import { WindowsScene } from "../../windows-scene";
import { FlexRow } from "ui";
import { FaDownload } from "react-icons/fa";

const DownloadLabel = () => {
  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <FaDownload />
      Archivos
    </div>
  );
};

const DownloadsSection = styled(Section)`
  @media (max-width: 768px) {
    padding: 100px 0;
    background: green;
  }
`;

const CustomRow = styled(FlexRow)`
  @media (max-width: 768px) {
    height: ${({ heights }) => heights.mobile};
    flex-direction: column;
    align-items: space-evenly;
    padding: 100px 0;
  }
`;

export const Downloads = () => {
  return (
    <DownloadsSection
      preset="1"
      id="downloads"
      heights={{ desktop: "100vh", mobile: "fit-content" }}
    >
      <CustomRow heights={{ desktop: "100vh", mobile: "fit-content" }}>
        <CustomCard
          releaseMetaData={{ date: "01/06/2024", releaseID: "0.0.5" }}
          topText={<DownloadLabel />}
          title="Para Linux"
          Scene={() => <TuxScene />}
        />
        <CustomCard
          releaseMetaData={{ date: "01/06/2024", releaseID: "0.0.3" }}
          topText={<DownloadLabel />}
          title="Para Windows"
          Scene={() => <WindowsScene />}
        />
        <CustomCard
          releaseMetaData={{ date: "01/06/2024", releaseID: "0.0.3" }}
          topText={<DownloadLabel />}
          title="Para MacOS"
          Scene={() => <MacOScene />}
        />
      </CustomRow>
    </DownloadsSection>
  );
};
