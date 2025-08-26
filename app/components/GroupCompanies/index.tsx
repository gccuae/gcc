import PageBnr from "../common/PageBnr";
import { groupCompaniesData } from "./data";
import CounterSection from "./CounterSection";

const index = () => {
  return ( 
    <>
      <PageBnr pageTitle={groupCompaniesData.title} bannerImg={groupCompaniesData.bannerImg} />
      <CounterSection />
    </>
   );
}
 
export default index;