"use client";
import PageHeader from "./PageHeader";
import JobSpecs from "./JobSpecs";
import JobDetails from "./JobDetails";
import { careerData } from "../careers/type";
const Index = ({ data }: { data: careerData['openings'][number] }) => {
  return (
    <>
      {!data.firstSection.hidden && <PageHeader title={data.firstSection.jobTitle} />}
      {!data.firstSection.hidden && <JobSpecs data={data.firstSection} />}
      <JobDetails secondSection={data.secondSection} thirdSection={data.thirdSection} forthSection={data.forthSection} />
    </>
  );
};

export default Index;
