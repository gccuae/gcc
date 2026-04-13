import PageBnr from "../common/PageBnr";
import CounterSection from "./CounterSection";
import BusinessNetworks from "./BusinessNetworks";
import { GroupCompaniesProps } from "./type";

const index = ({ data }: GroupCompaniesProps) => {
  return (
    <>
      <PageBnr
        pageTitle={data.pageTitle}
        bannerImg={data.banner}
        bannerAlt={data.bannerAlt}
        bannerHidden={data.bannerHidden}
      />
      {!data.firstSection.hidden && <CounterSection data={data.firstSection} />}
      {!data.secondSection.hidden && <BusinessNetworks data={data.secondSection} />}
    </>
  );
};

export default index;
