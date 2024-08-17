import { styled } from "styled-components";
import { forwardRef } from "react";
import useReleaseData from "../../../../hooks/use-release-data";
import { BackgroundVideo } from "ui/website/background-video";
import { HTTPError, HttpLoading, OSLabels } from "ui";

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
  width: calc(100% - 50px - 10px);

  @media (max-width: 576px) {
  }
  @media (max-width: 992px) {
  }
  @media (max-width: 1200px) {
  }
  @media (max-width: 768px) {
    height: content-fit;
    width: 100%;
    flex-direction: column;
  }
`;

export const OSButtons = forwardRef(({}, ref) => {
  const {
    data: { windows, linux, mac },
    error,
    loading,
  } = useReleaseData();

  if (loading) {
    return <HttpLoading />;
  }

  if (error) {
    return <HTTPError />;
  }

  return (
    <Buttons>
      <BackgroundVideo.Controls ref={ref} />
      <OSLabels
        links={{
          linux: linux.endpoint,
          windows: windows.endpoint,
          mac: mac.endpoint,
        }}
      />
      <div
        style={{ width: "50px", height: "50px", visibility: "hidden" }}
      ></div>
    </Buttons>
  );
});
