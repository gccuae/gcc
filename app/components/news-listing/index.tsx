import PageBnr from "../common/PageBnr";
import Main from "./Main";
import { newsData } from "./data";
import NewsList from "./NewsList";
const Index = () => {
  const sortedNews = [...newsData.items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];
  return ( 
    <>
    <PageBnr pageTitle="News" bannerImg="/assets/img/news/bnr.jpg" />
    <Main title={newsData.title} link={newsData.link} items={[sortedNews]} />
    <NewsList />
    </>
   );
}
 
export default Index;