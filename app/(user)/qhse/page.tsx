import Index from "@/app/components/Qhse/Index";

const Page = async () => {
  const [qhseData, certificationsData] = await Promise.all([
    fetch(`${process.env.BASE_URL}/api/admin/qhse`, {
      next: { revalidate: 60 },
    }).then((res) => res.json()),
    fetch(`${process.env.BASE_URL}/api/admin/awards`, {
      next: { revalidate: 60 },
    }).then((res) => res.json()),
  ]);

  return (
    <>
      <Index data={qhseData.data} certificationsData={certificationsData.data} />
    </>
  );
};

export default Page;
