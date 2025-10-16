import Index from "@/app/components/news-listing";

const Page = async () => {
    const response = await fetch(`${process.env.BASE_URL}/api/admin/news`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
    return <Index data={data.data}/>
}

export default Page;
