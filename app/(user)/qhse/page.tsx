import Index from "@/app/components/Qhse/Index";
import { Metadata } from "next";
const BASE_URL = process.env.BASE_URL!;

export async function generateMetadata(): Promise<Metadata> {
  const res = await fetch(`${BASE_URL}/api/admin/qhse`, {
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
  const [qhseData, certificationsData] = await Promise.all([
    fetch(`${process.env.BASE_URL}/api/admin/qhse`, {
      next: { revalidate: 60 },
    }).then((res) => res.json()),
    fetch(`${process.env.BASE_URL}/api/admin/awards`, {
      next: { revalidate: 60 },
    }).then((res) => res.json()),
  ]);

  return (
    <>
      <Index data={qhseData.data} certificationsData={certificationsData.data} />
    </>
  );
};

export default Page;
