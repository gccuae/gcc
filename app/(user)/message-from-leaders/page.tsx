import Index from "@/app/components/MessageFromLeaders";

const Page = async () => {
  const data = await fetch(`${process.env.BASE_URL}/api/admin/message`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return (
    <>
      <Index data={data.data} />
    </>
  );
};

export default Page;
