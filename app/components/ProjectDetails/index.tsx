import PageBnr from "../common/PageBnr";
import ProjectSlider from "./ProjectSlider";
import DetailsTab from "./DetailsTab";
import HIghlights from "./HIghlights";
import MoreProjects from "./MoreProjects";
import { SecondSectionItemData } from "./type";
import { Project } from "@/types/Projects";

interface Props {
  data: SecondSectionItemData;
  projects: Project;
}

const Index = ({ data, projects }: Props) => {
  return (
    <>
      <PageBnr
        pageTitle={data?.title || "Untitled Project"}
        bannerImg={data?.banner || ""}
        bannerAlt={data?.bannerAlt || ""}
      />
      <ProjectSlider data={data} />
      {data.thirdSection && <DetailsTab data={data.thirdSection} />}
      {data.forthSection && <HIghlights data={data.forthSection} />}
      <MoreProjects projects={projects.projects} />
    </>
  );
};

export default Index;
