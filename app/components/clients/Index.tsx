import PageBnr from "../common/PageBnr";
import { clientsData } from "./data";
import ClientList from "./client-list";

const Index = () => {
  return (
    <>
      <PageBnr
        pageTitle={clientsData.title}
        bannerImg={clientsData.bannerImg}
      />
      <ClientList />
    </>
  );
};

export default Index;
