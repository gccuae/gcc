import PageBnr from "../common/PageBnr";
import { expertiseData } from "./data";
import ImgDesc from "../common/ImgDesc";
import Services from "./Services";

const Index = () => {
  return (
    <>
      <PageBnr
        pageTitle={expertiseData.title}
        bannerImg={expertiseData.bannerImg}
      />
      <ImgDesc data={expertiseData.firstSection} />
      <Services />
    </>
  );
};

export default Index;
