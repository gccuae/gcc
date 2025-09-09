import PageBnr from "../common/PageBnr";
import { expertiseData,energyResourceData,socialImpactData } from "./data";
import ImgDesc from "../common/ImgDesc"; 
import EnergyResource from "./EnergyResource";
import SocialImpact from "./SocialImpact";
const Index = () => {
  return (
    <>
      <PageBnr pageTitle={expertiseData.title} bannerImg={expertiseData.bannerImg} />
      <ImgDesc data={expertiseData.firstSection} /> 
      <EnergyResource data={energyResourceData.data} /> 
      <SocialImpact data={socialImpactData.data} />
    </>
   );
}
 
export default Index;