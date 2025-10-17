import Index from "@/app/components/clients/Index";

const Page = async () => {
  const data = await fetch(`${process.env.BASE_URL}/api/admin/clients`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return <Index data={data.data} />;
};
export default Page;
