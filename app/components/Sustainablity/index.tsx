import PageBnr from "../common/PageBnr";
import ImgDesc from "../common/ImgDesc";
import EnergyResource from "./EnergyResource";
import SocialImpact from "./SocialImpact";
import UnGoals from "./UnGoals";
import { SustainabilityType } from "./type";

const Index = ({ data }: { data: SustainabilityType }) => {
  return (
    <>
      <PageBnr
        pageTitle={data.pageTitle}
        bannerImg={data.banner}
        bannerAlt={data.bannerAlt}
        bannerHidden={data.bannerHidden}
      />
      {!data.firstSection.hidden && <ImgDesc data={data.firstSection} />}
      {!data.secondSection.hidden && <EnergyResource data={data.secondSection} />}
      {!data.thirdSection.hidden && <SocialImpact data={data.thirdSection} />}
      {!data.forthSection.hidden && <UnGoals data={data.forthSection} />}
    </>
  );
};

export default Index;
