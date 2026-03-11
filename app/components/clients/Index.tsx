import PageBnr from "../common/PageBnr";
import ClientList from "./client-list";
import { ClientsData } from "./type";

const Index = ({ data }: { data: ClientsData }) => {
  return (
    <>
      <PageBnr pageTitle={data.pageTitle} bannerImg={data.banner} bannerAlt={data.bannerAlt} />
      <ClientList data={data.firstSection} />
    </>
  );
};

export default Index;
