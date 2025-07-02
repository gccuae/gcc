import NewsBlock from  "./NewsBlock"
import { homeData } from "./data"
import HeroSlider from "./HeroSlider";
import { homeDataBanner,homeDataFeaturedProjects } from "@/public/data/homebanner-data"
import AboutCompany from "./AboutCompany";
import FeaturedProjects from "./FeaturedProjects";
const Index = () => {
  return ( 
    <>
       <HeroSlider data={homeDataBanner}/>
       <AboutCompany />
       <FeaturedProjects data={homeDataFeaturedProjects} />
      <NewsBlock title={homeData.sixthSection[0].title} link={homeData.sixthSection[0].link} items={homeData.sixthSection[0].items} /> 
    </>
   );
}
 
export default Index;