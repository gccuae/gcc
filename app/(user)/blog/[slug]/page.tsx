import Index from "@/app/components/blog-details/index";
import { Metadata } from "next";
const BASE_URL = process.env.BASE_URL!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const res = await fetch(`${BASE_URL}/api/admin/blogs?slug=${slug}`, {
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

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const response = await fetch(
    `${process.env.BASE_URL}/api/admin/blogs?slug=${slug}`,
    { next: { revalidate: 60 } },
  );

  const allBlogResponse = await fetch(
    `${process.env.BASE_URL}/api/admin/blogs`,
    { next: { revalidate: 60 } },
  );

  const allBlogData = await allBlogResponse.json();
  const data = await response.json();
  return <Index data={data.data} allBlogData={allBlogData.data} />;
};

export default Page;
