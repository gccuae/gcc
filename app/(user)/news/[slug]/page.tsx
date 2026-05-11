import Index from "@/app/components/news-details";
import { Metadata } from "next";
const BASE_URL = process.env.BASE_URL!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const res = await fetch(`${BASE_URL}/api/admin/news?slug=${slug}`, {
    next: { revalidate: 60 },
  });
  const { data } = await res.json();

  const title =
    data[0]?.metaTitle?.trim() ||
    data[0]?.title?.trim() ||
    data[0]?.pageTitle?.trim() ||
    data[0]?.firstSection?.title?.trim() ||
    data[0]?.firstSection?.mainTitle?.trim() ||
    "GCC";

  const description =
    data[0]?.metaDescription?.trim() ||
    data[0]?.title?.trim() ||
    data[0]?.pageTitle?.trim() ||
    data[0]?.firstSection?.title?.trim() ||
    data[0]?.firstSection?.mainTitle?.trim() ||
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
    `${process.env.BASE_URL}/api/admin/news?slug=${slug}`,
    { next: { revalidate: 60 } },
  );

  const allNewsResponse = await fetch(
    `${process.env.BASE_URL}/api/admin/news`,
    { next: { revalidate: 60 } },
  );

  const allNewsData = await allNewsResponse.json();
  const data = await response.json();
  return <Index data={data.data[0]} allNewsData={allNewsData.data} />;
};

export default Page;
