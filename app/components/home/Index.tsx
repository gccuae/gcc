import NewsBlock from "./NewsBlock";
import { homeData } from "./data";
const Index = () => {
  return ( 
    <>
      <NewsBlock title={homeData.sixthSection[0].title} link={homeData.sixthSection[0].link} items={homeData.sixthSection[0].items} /> 
    </>
   );
}
 
export default Index;