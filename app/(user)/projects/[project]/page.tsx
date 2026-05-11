import Index from "@/app/components/ProjectDetails";
import { Metadata } from "next";
const BASE_URL = process.env.BASE_URL!;

export async function generateMetadata({ params }: { params: Promise<{ project: string }> }): Promise<Metadata> {
  const { project } = await params;
  const res = await fetch(`${BASE_URL}/api/admin/projects?slug=${project}`, {
    next: { revalidate: 60 },
  });
  const { data } = await res.json();

  const title =
    data?.metaTitle?.trim() ||
    data?.title?.trim() ||
    data?.pageTitle?.trim() ||
    data?.firstSection?.title?.trim() ||
    data?.firstSection?.mainTitle?.trim() ||
    "GCC";

  const description =
    data?.metaDescription?.trim() ||
    data?.title?.trim() ||
    data?.pageTitle?.trim() ||
    data?.firstSection?.title?.trim() ||
    data?.firstSection?.mainTitle?.trim() ||
    "GCC";

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/`,
    },
  };
}



type Props = {
  params: Promise<{ project: string }>;
};

const Page = async ({ params }: Props) => {
  const { project } = await params;

  async function getProject(project: string) {
    const url = `${process.env.BASE_URL}/api/admin/projects?slug=${project}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    return res.json();
  }

  async function getProjects() {
    const url = `${process.env.BASE_URL}/api/admin/projects`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    return res.json();
  }

  const projectData = await getProject(project);
  const projectsData = await getProjects();

  return (
    <>
      <Index data={projectData?.data} projects={projectsData?.data} />
    </>
  );
};

export default Page;
