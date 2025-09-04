import PageBnr from "../common/PageBnr";
import { projectDetailsData } from "./data";
import ProjectSlider from "./ProjectSlider";
const Index = () => {
  return (
    <>
    <PageBnr pageTitle={projectDetailsData.title} bannerImg={projectDetailsData.banner} />
    <ProjectSlider />
    </>
  );
}
 
export default Index;