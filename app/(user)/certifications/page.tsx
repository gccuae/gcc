import Index from "@/app/components/certifications";

const Page = async () => {
  const data = await fetch(`${process.env.BASE_URL}/api/admin/awards`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return (
    <main>
      <Index data={data.data} />
    </main>
  );
};

export default Page;
