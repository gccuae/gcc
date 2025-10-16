import PageBnr from "../common/PageBnr";
import BlogList from "./BlogList";
import { BlogData } from "./type";

const Index = ({data}: {data: BlogData}) => {
  console.log(data);
  return (
    <>
      <PageBnr pageTitle={data.pageTitle} bannerImg={data.banner} bannerAlt={data.bannerAlt}/>
      <BlogList data={data}/>
    </>
  );
};

export default Index;
