import PageBnr from "../common/PageBnr";
import {
  expertiseData,
  energyResourceData,
  socialImpactData,
  fifthSection,
} from "./data";
import ImgDesc from "../common/ImgDesc";
import EnergyResource from "./EnergyResource";
import SocialImpact from "./SocialImpact";
import UnGoals from "./UnGoals";

const Index = () => {
  return (
    <>
      <PageBnr
        pageTitle={expertiseData.title}
        bannerImg={expertiseData.bannerImg}
      />
      <ImgDesc data={expertiseData.firstSection} />
      <EnergyResource data={energyResourceData.data} />
      <SocialImpact data={socialImpactData.data} />
      <UnGoals data={fifthSection} />
    </>
  );
};

export default Index;
