"use client";

// import ProjectList from "./sections/ProjectList";
import { APIProvider } from "@vis.gl/react-google-maps";
// import { ProjectsPage } from "@/types/Projects";
import { ProjectsResponse } from "./type";
import PageBnr from "../common/PageBnr";
import FeaturedProjects from "../Home/FeaturedProjects";
import ProjectsList from "./sections/ProjectsList";

interface Sector {
  _id: string;
  name: string;
}

interface ProjectType {
  _id: string;
  name: string;
}

interface Location {
  _id: string;
  name: string;
}

const Index = ({
  projects,
  sectors,
  projectTypes,
  locations,
}: {
  projects: ProjectsResponse;
  sectors: Sector[];
  projectTypes: ProjectType[];
  locations: Location[];
}) => {
  return (
    <>
      <PageBnr pageTitle={projects.data.pageTitle} bannerImg={projects.data.banner} bannerAlt={projects.data.bannerAlt} />
      <FeaturedProjects data={{ projects: projects.data.projects.filter((item)=>item.status !== "draft") }} />
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string}>
        {/* <ProjectList
          projects={projects}
          sectors={sectors}
          projectTypes={projectTypes}
        /> */}
        <ProjectsList data={projects.data} sectorsData={sectors} projectTypesData={projectTypes} locationsData={locations} />
      </APIProvider>
    </>
  );
};

export default Index;
