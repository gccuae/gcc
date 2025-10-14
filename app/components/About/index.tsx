import ImgDesc from "../common/ImgDesc";
import PageBnr from "../common/PageBnr";
import { aboutData, Whychoosedata } from "./data";
import WhatWeDo from "./WhatWeDo";
import ViMiVa from "./ViMiVa";
import LegacyTimelineSlider from "./LegacyTimelineSlider";
import WhyChoose from "./WhyChoose";

const Index = ({ data }: any) => {
  console.log(data, "hisha");

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
      <WhyChoose data={Whychoosedata.data} />
    </>
  );
};

export default Index;
