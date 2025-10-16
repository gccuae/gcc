
import Index from "@/app/components/blog-details/index";

const Page = async({params}: {params: Promise<{slug: string}>}) => {
    const slug = (await params).slug;
    const response = await fetch(
    `${process.env.BASE_URL}/api/admin/blogs?slug=${slug}`,
    { next: { revalidate: 60 } }
  );

  const allBlogResponse = await fetch(
    `${process.env.BASE_URL}/api/admin/blogs`,
    { next: { revalidate: 60 } }
  );

    const allBlogData = await allBlogResponse.json();
    const data = await response.json();
    return <Index data={data.data} allBlogData={allBlogData.data}/>;
}

export default Page;