import Index from "@/app/components/expertise";

const Page = async () => {
  const data = await fetch(`${process.env.BASE_URL}/api/admin/expertise`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return <Index data={data.data} />;
};

export default Page;
