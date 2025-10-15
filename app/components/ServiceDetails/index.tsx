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
      {data.firstSection && <Main data={data.firstSection} />}
      {data.secondSection && <Scops data={data.secondSection} />}
      <KeyProjects projects={projects} />
      {data.thirdSection && <Cta data={data.thirdSection} />}
      <MoreExpertise allServices={allServices} />
    </>
  );
};

export default Index;
