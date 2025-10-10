"use client"

import ProjectList from "./sections/ProjectList";
// import { projects } from "./data";
import {APIProvider} from '@vis.gl/react-google-maps';
import { Project } from "@/types/Projects";

interface Sector {
  name: string;
}

interface ProjectType {
  name: string;
}

const Index = ({projects, sectors, projectTypes}: {projects: Project, sectors: Sector[], projectTypes: ProjectType[]}) => {
  return (
    <>
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string}>
      <ProjectList projects={projects} sectors={sectors} projectTypes={projectTypes}/>
    </APIProvider>
    </>
  );
};

export default Index;
