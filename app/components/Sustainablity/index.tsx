import PageBnr from "../common/PageBnr";
import { expertiseData,energyResourceData } from "./data";
import ImgDesc from "../common/ImgDesc"; 
import EnergyResource from "./EnergyResource";
const Index = () => {
  return (
    <>
      <PageBnr pageTitle={expertiseData.title} bannerImg={expertiseData.bannerImg} />
      <ImgDesc data={expertiseData.firstSection} /> 
      <EnergyResource data={energyResourceData.data} /> 
    </>
   );
}
 
export default Index;