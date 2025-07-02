import NewsBlock from "./NewsBlock";
import { homeData } from "./data";
import HeroSlider from "./HeroSlider";
import { homeDataBanner } from "@/public/data/homebanner-data"
import SectorSlider from "./SectorSlider";
import AreaOfExpertise from "./AreaOfExpertise";
const Index = () => {
  return ( 
    <>
      <HeroSlider data={homeDataBanner}/>
      <AreaOfExpertise data={homeData.fourthSection}/>
      <SectorSlider data={homeData.fifthSection} />
      <NewsBlock title={homeData.sixthSection.title} link={homeData.sixthSection.link} items={homeData.sixthSection.items} /> 
    </>
   );
}
 
export default Index;