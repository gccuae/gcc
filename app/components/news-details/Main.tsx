import StandardBnr from "../common/StandardBnr";
import { newsDetails } from "./data";
import MainContent from "./MainContent";
import SidebarContent from "./SidebarContent";

const Main = () => {
  return (
    <section className="py-57px">
      <div className="container">
        <StandardBnr title={newsDetails.title} />
        <div className="grid grid-cols-1 xl:grid-cols-[75%_25%] gap-3 md:gap-5 xl:gap-70px mt-5 xl:mt-12">
          <MainContent
            subTitle={newsDetails.subTitle}
            image={newsDetails.image}
            sector={newsDetails.sector}
            date={newsDetails.date}
            desc={newsDetails.desc}
          />

          <SidebarContent />
        </div>
      </div>
    </section>
  );
};

export default Main;
