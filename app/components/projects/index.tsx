"use client";

import ProjectList from "./sections/ProjectList";
import { APIProvider } from "@vis.gl/react-google-maps";
import { ProjectsPage } from "@/types/Projects";
import PageBnr from "../common/PageBnr";

interface Sector {
  name: string;
}

interface ProjectType {
  name: string;
}

const Index = ({
  projects,
  sectors,
  projectTypes,
}: {
  projects: ProjectsPage;
  sectors: Sector[];
  projectTypes: ProjectType[];
}) => {
  return (
    <>
      <PageBnr
        pageTitle={projects.pageTitle}
        bannerImg={projects.banner}
        bannerAlt={projects.bannerAlt}
      />
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string}>
        <ProjectList
          projects={projects}
          sectors={sectors}
          projectTypes={projectTypes}
        />
      </APIProvider>
    </>
  );
};

export default Index;
