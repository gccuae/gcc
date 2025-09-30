import ProjectList from "./sections/ProjectList";
import { projects } from "./data";

const Index = () => {
  return (
    <>
      <ProjectList projects={projects} />
    </>
  );
};

export default Index;
