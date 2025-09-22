import { projectDetailsData } from "./data";
const HIghlights = () => {
  return ( 
    <section className="py-57px bg-black ">
      <div className="container">
        <h2 className="text-6xl leading-[1.147058823529412] text-white  mb-57px">{projectDetailsData.Highlights.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-20">
          {projectDetailsData.Highlights.items.map((item, index) => (
            <div key={index} className="group grid gap-30px grid-rows-[auto_1fr]">
              <div className="border-b border-smgray group-hover:border-b-primary pb-30px transition-all duration-300">
                <h3 className="text-2xl leading-[1.5625] text-white ">{item.title}</h3>
              </div>
              <p className="text-lg leading-[1.5625] text-white/80 ">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>  
    </section>
   );
}
 
export default HIghlights;