import HeroSlider from "../components/Home/HeroSlider"; 
import { homeDataBanner } from "@/public/data/homebanner-data"
import { homeData } from "./data";
export default function Home() {
  return (
    <> 
       <HeroSlider data={homeDataBanner}/>
        <NewsBlock title={homeData.sixthSection[0].title} link={homeData.sixthSection[0].link} items={homeData.sixthSection[0].items} /> 
    </>

  );
}