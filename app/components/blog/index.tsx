import PageBnr from "../common/PageBnr";
import BlogList from "./BlogList";
import { blogData } from "./data";

const Index = () => {
  return (
    <>
      <PageBnr pageTitle={blogData.pageTitle} bannerImg={blogData.bannerImg} />
      <BlogList />
    </>
  );
}
 
export default Index;