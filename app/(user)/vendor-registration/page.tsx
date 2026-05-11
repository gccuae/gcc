// import Main from "@/app/components/vendor-registration/Main";
// import PageBnr from "@/app/components/common/PageBnr";

// const Index = () => {
//     return (
//         <>
//             <PageBnr
//                 pageTitle="Vendor Registration"
//                 bannerImg="/assets/img/clients/bnr.jpg"
//                 bannerAlt=""
//             />
//             <Main />
//         </>
//     );
// };

// export default Index;

import Index from "@/app/components/vendor-registration/Index";
import { Metadata } from "next";

const BASE_URL = process.env.BASE_URL!;

export async function generateMetadata(): Promise<Metadata> {
  const res = await fetch(`${BASE_URL}/api/admin/vendor/enquiry`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch");

  const { seo } = await res.json();

  const title = seo?.metaTitle?.trim() || "Vendor Registration | GCC";
  const description =
    seo?.metaDescription?.trim() || "Vendor Registration | GCC";

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}` },
  };
}

const Page = async () => {
  return <Index />;
};

export default Page;
