import { newsDetails } from "./data";
import MainContent from "./MainContent";
import SidebarContent from "./SidebarContent";

const Main = () => {
  return ( 
    <section className="py-57px">
      <div className="container">
        <div className="border-b border-smgray pb-5 xl:pb-10">
          <h2 className="text-5xl leading-lh-title font-normal mb-5 xl:mb-[27px] text-black dark:text-white">{newsDetails.title}</h2>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-[75%_25%] gap-5 xl:gap-70px mt-5 xl:mt-12">
         
            <MainContent subTitle={newsDetails.subTitle} image={newsDetails.image} sector={newsDetails.sector} date={newsDetails.date} desc={newsDetails.desc} />
         
            <SidebarContent />
          
        </div>
      </div>
    </section>
   );
}
 
export default Main;