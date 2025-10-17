import Index from "@/app/components/OurTeam";

const Page = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/team`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  
  return (
    <>
      <Index data={data.data} />
    </>
  );
};

export default Page;
