import PageBnr from "../common/PageBnr";
import { clientsData } from "./data";
import ClientList from "./client-list";
const Index = () => {
  return ( 
    <>
    <PageBnr pageTitle={clientsData.title} bannerImg={clientsData.bannerImg} />
    <section className="pb-4 md:pb-57px py-57px">
      <div className="container">
        <p className="text-lg leading-lh-text19 dark:text-white/80">{clientsData.desc}</p>
      </div>
    </section>
    <ClientList />
    </>
   );
}
 
export default Index;