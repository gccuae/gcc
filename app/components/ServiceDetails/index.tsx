import Main from "./Main";
import Scops from "./Scops";
import KeyProjects from "./KeyProjects";
import Cta from "./Cta";
import MoreExpertise from "./MoreExpertise";
import { SecondSectionItem } from "../expertise/type";
import { SingleProject } from "../expertise/type";

interface ServiceDetailsProps {
  data: SecondSectionItem;
  allServices: SecondSectionItem[];
  projects: SingleProject[];
}


const Index = ({ data, allServices, projects }: ServiceDetailsProps) => {
  return (
    <>
      {data.firstSection && <Main data={data.firstSection} title={data.title} />}
      {data.secondSection && data.secondSection.items.length > 0 && ( <Scops data={data.secondSection} /> )}
      {projects.length > 0 && <KeyProjects projects={projects} />}
      {data.thirdSection && <Cta data={data.thirdSection} />}
      <MoreExpertise allServices={allServices} exclude={data._id} />
    </>
  );
};

export default Index;
