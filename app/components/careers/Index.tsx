import StandardBnr from "../common/StandardBnr";
import { careerData } from "./data";
import Main from "./Main";
import CurrentOpenings from "./CurrentOpenings";
import JobApplicationForm from "./JobApplicationForm";
const Index = () => {
  return (
    <>
    <section className="pt-57px dark:bg-black overflow-hidden">
      <div className="container">
        <StandardBnr title={careerData.title} /> 
      </div>
    </section>
    <Main data={careerData} />
    {/* <CurrentOpenings data={careerData} /> */}
    <JobApplicationForm />
    </>
  );
}
 
export default Index;