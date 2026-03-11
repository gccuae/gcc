import StandardBnr from "../common/StandardBnr";
import MainContent from "./MainContent";
import SidebarContent from "./SidebarContent";
import { NewsData } from "../news-listing/type";


const Main = ({data,allNewsData}: {data: NewsData['categories'][number]['news'][number],allNewsData: NewsData}) => {
  return (
    <section className="pt-57px pb-12 md:pb-15 xl:py-57px dark:bg-light-dark">
      <div className="container">
        <StandardBnr title={data.title} />
        <div className="grid grid-cols-1 xl:grid-cols-[65%_30%] 2xl:grid-cols-[75%_25%] gap-3 md:gap-5 xl:gap-10 2xl:gap-12 mt-5 xl:mt-12">
          <MainContent
            subTitle={data.subTitle}
            images={data.images}
            sector={data.category}
            date={data.date ? new Date(data.date).toLocaleDateString("en-GB").replace(/\//g, "-") : new Date(data.createdAt).toLocaleDateString("en-GB").replace(/\//g, "-")}
            content={data.content}
          />

          <SidebarContent
            allNewsData={allNewsData}
            category={data.category}
            currentSlug={data.slug}
          />
        </div>
      </div>
    </section>
  );
};

export default Main;
