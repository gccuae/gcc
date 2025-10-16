import Index from "@/app/components/contact-us/index"
const Page = async () => {
      const response = await fetch(`${process.env.BASE_URL}/api/admin/contact`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
    
    return <Index data={data.data}/>
}
export default Page