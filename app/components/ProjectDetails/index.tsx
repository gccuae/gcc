import PageBnr from "../common/PageBnr";
import ProjectSlider from "./ProjectSlider";
import DetailsTab from "./DetailsTab";
import HIghlights from "./HIghlights";
import MoreProjects from "./MoreProjects";
import { SecondSectionItemData } from "./type";
import { Project } from "@/types/Projects";
import LocationDetails from "./LocationDetails";

interface Props {
  data: SecondSectionItemData;
  projects: Project;
}

const Index = ({ data, projects }: Props) => {
  //skip the current project from the more-projects list
  const filteredProjects = projects.projects.filter(
    (p) => p._id !== data._id && p.slug !== data.slug
  );
  return (
    <>
      <PageBnr
        pageTitle={data?.title || "Untitled Project"}
        bannerImg={data?.banner || ""}
        bannerAlt={data?.bannerAlt || ""}
      />
      <ProjectSlider data={data} />
      {data.forthSection && <HIghlights data={data.forthSection} />}
      {data.thirdSection?.items && data.thirdSection.items.length > 0 && (
        <DetailsTab data={data.thirdSection} />
      )}
      {data.fifthSection && <LocationDetails data={data.fifthSection} />}
      <MoreProjects projects={filteredProjects} />
    </>
  );
};

export default Index;
