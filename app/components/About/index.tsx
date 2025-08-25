import ImgDesc from "../common/ImgDesc";
import PageBnr from "../common/PageBnr";
import { aboutData } from "./data";
import WhatWeDo from "./WhatWeDo";
import VMV from "./VMV";
import LegacyTimelineSlider from "./LegacyTimelineSlider";
import WhyChoose from "./WhyChoose";
const Index = () => {
  return ( 
    <>
    <PageBnr pageTitle={aboutData.pageTitle} bannerImg={aboutData.bannerImg} />
    <ImgDesc data={aboutData.section1} />
    <WhatWeDo />
    <VMV />
    <LegacyTimelineSlider title={aboutData.timelineData.title} data={aboutData.timelineData.items} />
    <WhyChoose data={aboutData.whyChoose.items} secTitle={aboutData.whyChoose.title} subTitle={aboutData.whyChoose.subTitle} />
    </>
   );
}
 
export default Index;  