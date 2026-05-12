import Index from "@/app/components/contact-us/index";
import { Metadata } from "next";

const BASE_URL = process.env.BASE_URL!;

export async function generateMetadata(): Promise<Metadata> {
  const res = await fetch(`${BASE_URL}/api/admin/contact`, {
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
  const response = await fetch(`${process.env.BASE_URL}/api/admin/contact`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();

  return <Index data={data.data} />;
};
export default Page;
