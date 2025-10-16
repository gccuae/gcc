import Main from "./Main";
import { NewsData } from "../news-listing/type";

const Index = ({data,allNewsData}: {data: NewsData['categories'][number]['news'][number],allNewsData: NewsData}) => {
  return (
    <>
      <Main data={data} allNewsData={allNewsData}/>
    </>
  );
};

export default Index;
