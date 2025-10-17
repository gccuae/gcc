import ImgDesc from "../common/ImgDesc";
import PageBnr from "../common/PageBnr";
import WhatWeDo from "./WhatWeDo";
import ViMiVa from "./ViMiVa";
import LegacyTimelineSlider from "./LegacyTimelineSlider";
import WhyChoose from "./WhyChoose";
import { HomePageData } from "./type";

interface HomeIndexProps {
  data: HomePageData;
}

const Index = ({ data }: HomeIndexProps) => {
  return (
    <>
      <PageBnr
        pageTitle={data.pageTitle}
        bannerImg={data.banner}
        bannerAlt={data.bannerAlt}
      />
      <ImgDesc data={data.firstSection} />
      <WhatWeDo data={data.secondSection} />
      <ViMiVa data={data.thirdSection} />
      <LegacyTimelineSlider data={data.historySection} />
      <WhyChoose data={data.fifthSection} />
    </>
  );
};

export default Index;
