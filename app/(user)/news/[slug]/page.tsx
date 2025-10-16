import Index from "@/app/components/news-details";

const Page = async({params}: {params: Promise<{slug: string}>}) => {
    const slug = (await params).slug;
    const response = await fetch(
    `${process.env.BASE_URL}/api/admin/news?slug=${slug}`,
    { next: { revalidate: 60 } }
  );

  const allNewsResponse = await fetch(
    `${process.env.BASE_URL}/api/admin/news`,
    { next: { revalidate: 60 } }
  );

    const allNewsData = await allNewsResponse.json();
    const data = await response.json();
    return <Index data={data.data[0]} allNewsData={allNewsData.data}/>;
}

export default Page;