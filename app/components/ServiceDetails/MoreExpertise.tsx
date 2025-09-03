import { serviceDetailsData } from "./data";
import ExpertiseCard from "../expertise/ExpertiseCard";
import BtnPrimary from "../common/BtnPrimary";

const MoreExpertise = () => {
  return ( 
  <section className="py-57px bg-light-white dark:bg-black">
    <div className="container">
        <div className="flex justify-between items-center pb-8 xl:pb-[45px] mb-8 xl:mb-15 border-b border-smgray">
        <h2 className="text-5xl leading-[1.147058823529412] text-black dark:text-white">{serviceDetailsData.moreExperiences.title}</h2>
          <BtnPrimary link={"#"} text="View All" bgtrans={true} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-10">
        {serviceDetailsData.moreExperiences.items.map((item, index) => (
          <ExpertiseCard key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  </section> );
}
 
export default MoreExpertise;