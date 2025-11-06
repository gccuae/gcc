import Index from "@/app/components/About";

const Page = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/about`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();

  const expertiseData = await fetch(
    `${process.env.BASE_URL}/api/admin/expertise`,
    {
      next: { revalidate: 60 },
    }
  ).then((res) => res.json());

  return (
    <>
      <Index data={data.data} expertiseData={expertiseData.data.secondSection} />
    </>
  );
};

export default Page;
