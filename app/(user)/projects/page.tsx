import Index from "@/app/components/projects/index";
import { Metadata } from "next";
const BASE_URL = process.env.BASE_URL!;

export async function generateMetadata(): Promise<Metadata> {
  const res = await fetch(`${BASE_URL}/api/admin/projects`, {
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

const Page = async () => {
  const projectsResponse = await fetch(
    `${process.env.BASE_URL}/api/admin/projects`,
    {
      next: { revalidate: 60 },
    }
  );
  const projectsData = await projectsResponse.json();

  const sectorsResponse = await fetch(
    `${process.env.BASE_URL}/api/admin/projects/sector`,
    {
      next: { revalidate: 60 },
    }
  );
  const sectorsData = await sectorsResponse.json();

  const projectTypesResponse = await fetch(
    `${process.env.BASE_URL}/api/admin/projects/project-type`,
    {
      next: { revalidate: 60 },
    }
  );
  const projectTypesData = await projectTypesResponse.json();

  const locationsResponse = await fetch(
    `${process.env.BASE_URL}/api/admin/projects/location`,
    {
      next: { revalidate: 60 },
    }
  );
  const locationsData = await locationsResponse.json();


  return (
    <>
      <Index
        projects={projectsData}
        sectors={sectorsData.data}
        projectTypes={projectTypesData.data}
        locations={locationsData.data}
      />
    </>
  );
};

export default Page;
