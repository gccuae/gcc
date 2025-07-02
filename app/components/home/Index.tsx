import NewsBlock from "./NewsBlock";
import { homeData } from "./data";
import HeroSlider from "./HeroSlider";
import { homeDataBanner } from "@/public/data/homebanner-data"
const Index = () => {
  return ( 
    <>
       <HeroSlider data={homeDataBanner}/>
      <NewsBlock title={homeData.sixthSection[0].title} link={homeData.sixthSection[0].link} items={homeData.sixthSection[0].items} /> 
    </>
   );
}
 
export default Index;