import PageBnr from "../common/PageBnr";
import Main from "./Main";
import { NewsData } from "./type";
import NewsList from "./NewsList";

const Index = ({data}: {data: NewsData}) => {
  console.log(data)
  const items = data.categories.flatMap((item: { news: NewsData['categories'][number]['news'] }) => item.news);
  const sortedNews = [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];
  return (
    <>
      <PageBnr pageTitle={data.pageTitle} bannerImg={data.banner} bannerAlt={data.bannerAlt} />
      <Main title={"Latest Highlights"} items={[sortedNews]} />
      <NewsList data={data}/>
    </>
  );
};

export default Index;
