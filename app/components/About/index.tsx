import ImgDesc from "../common/ImgDesc";
import PageBnr from "../common/PageBnr";
import { aboutData } from "./data";
import WhatWeDo from "./WhatWeDo";
import VMV from "./VMV";
const Index = () => {
  return ( 
    <>
    <PageBnr pageTitle={aboutData.pageTitle} bannerImg={aboutData.bannerImg} />
    <ImgDesc data={aboutData.section1} />
    <WhatWeDo />
    <VMV />
    </>
   );
}
 
export default Index;