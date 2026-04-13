import PageBnr from "../common/PageBnr";
import ImgDesc from "../common/ImgDesc";
import Services from "./Services";
import { ExpertiseProps } from "./type";

const Index = ({ data }: ExpertiseProps) => {
  return (
    <>
      <PageBnr
        pageTitle={data.pageTitle}
        bannerImg={data.banner}
        bannerAlt={data.bannerAlt}
        bannerHidden={data.bannerHidden}
      />
      {!data.firstSection.hidden && <ImgDesc data={data.firstSection} />}
      {!data.secondSection.hidden && <Services data={data.secondSection} />}
    </>
  );
};

export default Index;
