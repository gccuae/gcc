import StandardBnr from "../common/StandardBnr";
import MainContent from "./MainContent";
import SidebarContent from "../news-details/SidebarContent";
import { NewsData } from "../news-listing/type";
import type { LinkedInVideoSource } from "@/lib/linkedinVideo";


const Main = ({data,allNewsData,video}: {data: NewsData['categories'][number]['news'][number],allNewsData: NewsData,video?: LinkedInVideoSource | null}) => {
  return (
    <section className="pt-57px pb-12 md:pb-15 xl:py-57px dark:bg-light-dark">
      <div className="container">
        <StandardBnr title={data?.title} />
        <div className="grid grid-cols-1 xl:grid-cols-[65%_30%] 2xl:grid-cols-[75%_25%] gap-3 md:gap-5 xl:gap-10 2xl:gap-12 mt-5 xl:mt-12">
          <MainContent
            title={data?.title}
            subTitle={data?.subTitle}
            images={data?.images}
            videoUrl={data?.videoUrl}
            video={video}
            content={data?.content}
          />

          <SidebarContent
            allNewsData={allNewsData}
            category={data?.category}
            currentSlug={data?.slug}
          />
        </div>
      </div>
    </section>
  );
};

export default Main;
