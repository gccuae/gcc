import PageBnr from "../common/PageBnr";
import { expertiseData } from "./data";
import ImgDesc from "../common/ImgDesc";
import AiSlider from "./AiSlider";
import Cta from "./Cta";

const Index = () => {
  return (
    <>
      <PageBnr pageTitle={expertiseData.title} bannerImg={expertiseData.bannerImg} />
      <ImgDesc data={expertiseData.firstSection} />
      <AiSlider />
      <Cta />
    </>
   );
}
 
export default Index;