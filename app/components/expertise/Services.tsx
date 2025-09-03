import { expertiseData } from "./data";
import ExpertiseCard from "./ExpertiseCard";
const Services = () => {
  return (
    <section className="py-57px bg-light-white dark:bg-black">
      <div className="container">
        <h2 className="text-5xl leading-[1.147058823529412] text-black dark:text-white pb-6 xl:pb-57px">Services for Any Project</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-4 xl:gap-x-[30px] xl:gap-y-[37px]">
          {expertiseData.services.items.map((item, index) => (
            <ExpertiseCard key={index} item={item} index={index} />
          ))} 
        </div>
      </div>
    </section>
  );
}

export default Services;