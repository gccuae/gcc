import PageBnr from "../common/PageBnr";
import ImgDesc from "../common/ImgDesc";
import AiSlider from "./AiSlider";
import Cta from "./Cta";
import { AiTechnologyType } from "./type";

const Index = ({data}: {data: AiTechnologyType}) => {
  return (
    <>
      <PageBnr pageTitle={data.pageTitle} bannerImg={data.banner} bannerAlt={data.bannerAlt}/>
      <ImgDesc data={data.firstSection} />
      <AiSlider data={data.secondSection.items}/>
      <Cta data={data.thirdSection}/>
    </>
   );
}
 
export default Index;