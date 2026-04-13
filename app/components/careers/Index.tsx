import StandardBnr from "../common/StandardBnr";
import { careerData } from "./type";
import Main from "./Main";
import CurrentOpenings from "./CurrentOpenings";
import JobApplicationForm from "./JobApplicationForm";
const Index = ({ data }: { data: careerData }) => {
  return (
    <>
      {!data.firstSection.hidden && <><section className="pt-57px dark:bg-black overflow-hidden">
        <div className="container">
          <StandardBnr title={data.firstSection.pageTitle} />
        </div>
      </section>
        <Main data={data.firstSection} /></>}
      {!data.secondSection.hidden && <CurrentOpenings data={data.secondSection} jobs={data.openings} departments={data.departments} locations={data.locations} />}
      {!data.thirdSection.hidden && <JobApplicationForm title={data.thirdSection.title} />}
    </>
  );
};

export default Index;
