import Index from "@/app/components/GroupCompanies";

const Page = async () => {
  const data = await fetch(`${process.env.BASE_URL}/api/admin/group-company`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  console.log(data);

  return (
    <>
      <Index data={data.data} />
    </>
  );
};

export default Page;
