import Index from "@/app/components/ServiceDetails";
import { SingleProject } from "@/app/components/expertise/type";

type Props = {
  params: Promise<{ service: string }>;
};

const Page = async ({ params }: Props) => {
  const { service } = await params;

  async function getService(service: string) {
    const url = `${process.env.BASE_URL}/api/admin/expertise?slug=${service}`;
    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) throw new Error("Failed to fetch service data");
    return res.json();
  }

  // All services
  async function getAllServices() {
    const services = await fetch(
      `${process.env.BASE_URL}/api/admin/expertise`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());
    return services;
  }

  async function getProjects() {
    const projects = await fetch(`${process.env.BASE_URL}/api/admin/projects`, {
      next: { revalidate: 60 },
    }).then((res) => res.json());
    return projects;
  }

  const serviceData = await getService(service);
  const allServices = await getAllServices();
  const allProjects = await getProjects();

  const relatedProjectIds = serviceData.data.projects;
  const filteredProjects = allProjects.data.projects.filter(
    (project: SingleProject) => relatedProjectIds.includes(project._id)
  );

  return (
    <main>
      <Index
        data={serviceData.data}
        allServices={allServices.data.secondSection.items}
        projects={filteredProjects}
      />
    </main>
  );
};

export default Page;
