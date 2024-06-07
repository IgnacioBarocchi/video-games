import { styled } from "styled-components";
import { CustomCard } from "../../custom-card";
import { FlexRow } from "ui";
import { FaDownload } from "react-icons/fa";
import { LINUX_LINK, MAC_LINK, WINDOWS_LINK } from "../../../constants";
import image from "../../../assets/images/BG1.png";
import { useEffect } from "react";
import useReleaseData from "../../../hooks/use-release-data";
import { HTTPError } from "../../error/error";
import { Loading } from "../../loading/loading";
import { MacOScene } from "../../scene-3d/mac-scene";
import { TuxScene } from "../../scene-3d/tux-scene";
import { WindowsScene } from "../../scene-3d/windows-scene";
import { Section } from "../../parallax-section";
import { Paragraph } from "../../responsive-text-content";

const DownloadLabel = () => {
  return (
    <Paragraph style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <FaDownload />
      Archivos
    </Paragraph>
  );
};

const DownloadsSection = styled(Section)`
  @media (max-width: 576px) {
  }
  @media (max-width: 992px) {
  }
  @media (max-width: 1200px) {
  }
  @media (max-width: 768px) {
    padding: 100px 0;
  }
`;

const CustomRow = styled(FlexRow)`
  @media (max-width: 576px) {
  }
  @media (max-width: 992px) {
  }
  @media (max-width: 1200px) {
  }
  @media (max-width: 768px) {
    height: ${({ heights }) => heights.mobile};
    flex-direction: column;
    gap: 100px;
    padding: 100px 0;
  }
`;

export const Downloads = () => {
  const {
    data: { windows, linux, mac },
    error,
    loading,
  } = useReleaseData();

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <HTTPError />;
  }

  return (
    <DownloadsSection
      image={image}
      preset="1"
      id="downloads"
      heights={{ desktop: "100vh", mobile: "fit-content" }}
    >
      <CustomRow heights={{ desktop: "100vh", mobile: "fit-content" }}>
        <a href={linux?.endpoint ?? ""} target="_blank">
          <CustomCard
            releaseMetaData={{ date: linux?.date, releaseID: linux?.version }}
            topText={<DownloadLabel />}
            title="Para Linux"
            Scene={() => <TuxScene />}
          />
        </a>
        <a href={windows?.endpoint ?? ""} target="_blank">
          <CustomCard
            releaseMetaData={{
              date: windows?.date,
              releaseID: windows?.version,
            }}
            topText={<DownloadLabel />}
            title="Para Windows"
            Scene={() => <WindowsScene />}
          />
        </a>
        <a href={mac?.endpoint ?? ""} target="_blank">
          <CustomCard
            releaseMetaData={{ date: mac?.date, releaseID: mac?.version }}
            topText={<DownloadLabel />}
            title="Para MacOS"
            Scene={() => <MacOScene />}
          />
        </a>
      </CustomRow>
    </DownloadsSection>
  );
};
