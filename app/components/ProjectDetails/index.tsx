import PageBnr from "../common/PageBnr";
import ProjectSlider from "./ProjectSlider";
import DetailsTab from "./DetailsTab";
import HIghlights from "./HIghlights";
import MoreProjects from "./MoreProjects";
import { SecondSectionItemData } from "./type";
import { Project } from "@/types/Projects";
import KeyFacts from "./KeyFacts";
import { Item } from "@radix-ui/react-select";

interface Props {
  data: SecondSectionItemData;
  projects: Project;
}

const Index = ({ data, projects }: Props) => {
  //skip the current project from the more-projects list
  const filteredProjects = projects.projects.filter((Item)=>Item.status !== "draft").filter(
    (p) => p._id !== data._id && p.slug !== data.slug
  );


  return (
    <>
      <PageBnr
        pageTitle={data?.title || "Untitled Project"}
        bannerImg={data?.banner || ""}
        bannerAlt={data?.bannerAlt || ""}
        titleClassName="text-white text-3xl md:text-4xl xl:text-5xl leading-[1.2] capitalize lettersp-2"
      />
      {data?.secondSection?.title && <ProjectSlider data={data} />}
      {data.numberSection && data.numberSection.items && <KeyFacts data={data.numberSection} />}
      {data?.forthSection?.title && <HIghlights data={data?.forthSection} />}
      {data?.thirdSection?.items && data?.thirdSection?.items.length > 0 && (
        <DetailsTab data={data?.thirdSection} />
      )}
      {/* {data?.fifthSection?.map && (
        <LocationDetails data={data?.fifthSection} />
      )} */}
      <MoreProjects projects={filteredProjects} />
    </>
  );
};

export default Index;
