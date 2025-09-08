
import BtnPrimary from "../common/BtnPrimary";
import { projectDetailsData } from "./data";
const MoreProjects = () => {
  return ( 
    <section className="py-57px bg-light-white dark:bg-black">
      <div className="container">
        <div className="flex justify-between items-center pb-8 xl:pb-[45px] mb-8 xl:mb-15 border-b border-smgray">
          <h2 className="text-5xl leading-[1.147058823529412] text-black dark:text-white">More Projects</h2>
          <BtnPrimary link={"#"} text="View All" bgtrans={true} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-10">
          {projectDetailsData.moreProjects.map((project, index) => (
            <div key={index} className="group border-b border-smgray pb-27px">
              <div>
                <img src={project.image} alt={project.title} className="w-full h-auto" />
              </div>
              <div className="pt-5 xl:pt-[27px]">
                <p className="text-lg leading-lh-text19 dark:text-white/80 mb-2 xl:mb-[12px]">{project.info.type} <span className="mx-2">|</span> {project.info.sector} <span className="mx-2">|</span> {project.info.location}</p>
                <h3 className="text-2xl leading-normal text-black dark:text-white ">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>  
    </section>
   );
}
 
export default MoreProjects;