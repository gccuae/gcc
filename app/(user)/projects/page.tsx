import Index from "@/app/components/projects/index";

const Page = async() => {
  const projectsResponse = await fetch(`${process.env.BASE_URL}/api/admin/projects`, {
    next: { revalidate: 60 },
  });
  const projectsData = await projectsResponse.json();

  const sectorsResponse = await fetch(`${process.env.BASE_URL}/api/admin/projects/sector`, {
    next: { revalidate: 60 },
  });
  const sectorsData = await sectorsResponse.json();

  const projectTypesResponse = await fetch(`${process.env.BASE_URL}/api/admin/projects/project-type`, {
    next: { revalidate: 60 },
  });
  const projectTypesData = await projectTypesResponse.json();

  return (
    <>
      <Index projects={projectsData.data} sectors={sectorsData.data} projectTypes={projectTypesData.data}/>
    </>
  );
};

export default Page;
