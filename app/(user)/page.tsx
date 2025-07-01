import HeroSlider from "../components/Home/HeroSlider"; 
import { homeData } from "@/public/data/homebanner-data"
export default function Home() {
  return (
    <div className="     "> 
       <HeroSlider data={homeData}/>
   
    </div>
  );
}
