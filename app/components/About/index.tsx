import ImgDesc from "../common/ImgDesc";
import PageBnr from "../common/PageBnr";
import WhatWeDo from "./WhatWeDo";
import ViMiVa from "./ViMiVa";
import LegacyTimelineSlider from "./LegacyTimelineSlider";
import WhyChoose from "./WhyChoose";
import { HomePageData } from "./type";
import { ExpertiseData } from "../expertise/type";

interface HomeIndexProps {
  data: HomePageData;
  expertiseData: ExpertiseData["secondSection"];
}

const Index = ({ data, expertiseData }: HomeIndexProps) => {
  return (
    <>
      <PageBnr
        pageTitle={data.pageTitle}
        bannerImg={data.banner}
        bannerAlt={data.bannerAlt}
        bannerHidden={data.bannerHidden}
      />
      <ImgDesc data={data.firstSection} />
      <WhatWeDo data={data.secondSection} expertiseData={expertiseData} />
      <ViMiVa data={data.thirdSection} />
      {!data.historySection.hidden && <LegacyTimelineSlider data={data.historySection} />}
      <WhyChoose data={data.fifthSection} />
    </>
  );
};

export default Index;
