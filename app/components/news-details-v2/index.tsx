import Main from "./Main";
import { NewsData } from "../news-listing/type";
import type { LinkedInVideoSource } from "@/lib/linkedinVideo";

const Index = ({data,allNewsData,video}: {data: NewsData['categories'][number]['news'][number],allNewsData: NewsData,video?: LinkedInVideoSource | null}) => {
  return (
    <>
      <Main data={data} allNewsData={allNewsData} video={video}/>
    </>
  );
};

export default Index;
