import ImgDesc from "../common/ImgDesc";
import PageBnr from "../common/PageBnr";
import { aboutData, Whychoosedata } from "./data";
import WhatWeDo from "./WhatWeDo";
import ViMiVa from "./ViMiVa";
import LegacyTimelineSlider from "./LegacyTimelineSlider";
import WhyChoose from "./WhyChoose";
const Index = () => {
  return (
    <>
      <PageBnr
        pageTitle={aboutData.pageTitle}
        bannerImg={aboutData.bannerImg}
      />
      <ImgDesc data={aboutData.section1} />
      <WhatWeDo />
      <ViMiVa />
      <LegacyTimelineSlider
        title={aboutData.timelineData.title}
        data={aboutData.timelineData.items}
      />
      <WhyChoose data={Whychoosedata.data} />
    </>
  );
};

export default Index;
