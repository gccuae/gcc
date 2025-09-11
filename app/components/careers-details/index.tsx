"use client"
import PageHeader from "./PageHeader";
import JobSpecs from "./JobSpecs";
import JobDetails from "./JobDetails";
const Index = () => {
  return ( 
    <>
      <PageHeader title="Site Engineer" />
      <JobSpecs />
      <JobDetails />
    </>
   );
}
 
export default Index;