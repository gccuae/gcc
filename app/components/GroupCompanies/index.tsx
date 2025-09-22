import PageBnr from "../common/PageBnr";
import { groupCompaniesData } from "./data";
import CounterSection from "./CounterSection";
import BusinessNetworks from "./BusinessNetworks";
const index = () => {
  return (
    <>
      <PageBnr
        pageTitle={groupCompaniesData.title}
        bannerImg={groupCompaniesData.bannerImg}
      />
      <CounterSection />
      <BusinessNetworks />
    </>
  );
};

export default index;
