import PageBnr from "../common/PageBnr";
import { projectDetailsData } from "./data";
import ProjectSlider from "./ProjectSlider";
import DetailsTab from "./DetailsTab";
import HIghlights from "./HIghlights";
import MoreProjects from "./MoreProjects";
const Index = () => {
  return (
    <>
      <PageBnr
        pageTitle={projectDetailsData.title}
        bannerImg={projectDetailsData.banner}
      />
      <ProjectSlider />
      <DetailsTab />
      <HIghlights />
      <MoreProjects />
    </>
  );
};

export default Index;
