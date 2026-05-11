import Index from "../components/Home/Index";
import { Metadata } from "next";

const BASE_URL = process.env.BASE_URL!;

export async function generateMetadata(): Promise<Metadata> {
  const res = await fetch(`${BASE_URL}/api/admin/home`, {
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

export default async function Home() {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/home`, {
    next: { revalidate: 60 },
  });
  const HomeData = await response.json();

  const projects = await fetch(`${process.env.BASE_URL}/api/admin/projects`, {
    next: { revalidate: 60 },
  });
  const projectsData = await projects.json();

  const news = await fetch(`${process.env.BASE_URL}/api/admin/news`, {
    next: { revalidate: 60 },
  });
  const newsData = await news.json();

  const expertise = await fetch(`${process.env.BASE_URL}/api/admin/expertise`, {
    next: { revalidate: 60 },
  });
  const expertiseData = await expertise.json();

  return (
    <>
      <Index
        data={HomeData.data}
        projects={projectsData.data}
        news={newsData.data}
        expertise={expertiseData.data}
      />
    </>
  );
}
