import PageBnr from "../common/PageBnr";
import ImgDesc from "../common/ImgDesc";
import AiSlider from "./AiSlider";
import Cta from "./Cta";
import { AiTechnologyType } from "./type";

const Index = ({ data }: { data: AiTechnologyType }) => {
  return (
    <>
      <PageBnr pageTitle={data.pageTitle} bannerImg={data.banner} bannerAlt={data.bannerAlt} bannerHidden={data.bannerHidden} />
      {!data.firstSection.hidden && <ImgDesc data={data.firstSection} />}
      {!data.secondSection.hidden && <AiSlider data={data.secondSection.items} />}
      {!data.thirdSection.hidden && <Cta data={data.thirdSection} />}
    </>
  );
}

export default Index;