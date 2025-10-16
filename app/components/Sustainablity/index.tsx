import PageBnr from "../common/PageBnr";
import ImgDesc from "../common/ImgDesc";
import EnergyResource from "./EnergyResource";
import SocialImpact from "./SocialImpact";
import UnGoals from "./UnGoals";
import { SustainabilityType } from "./type";

const Index = ({data}: {data: SustainabilityType}) => {
  return (
    <>
      <PageBnr
        pageTitle={data.pageTitle}
        bannerImg={data.banner}
        bannerAlt={data.bannerAlt}
      />
      <ImgDesc data={data.firstSection} />
      <EnergyResource data={data.secondSection} />
      <SocialImpact data={data.thirdSection} />
      <UnGoals data={data.forthSection} />
    </>
  );
};

export default Index;
