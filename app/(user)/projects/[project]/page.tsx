import Index from "@/app/components/ProjectDetails";

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
