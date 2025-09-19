

import { teamData } from "./data";
import Image from "next/image";

const LeadersList = () => {
  return ( 
    <section className="pt-15 xl:pt-25px ">
    <div className="container">
      <h2 className="text-6xl leading-lh-title text-black dark:text-white mb-57px">{teamData.leadersTitle}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 xl:gap-y-0 pb-6 xl:pb-[37px] border-b border-smgray mb-12 xl:mb-57px">
        {teamData.leaders.map((leader, index) => (
           <div key={index} className="group">
            <div className={`${index % 2 === 0 ? "bg-[#ebebeb]" : "bg-[#dfdfdf]"} group-hover:bg-gray-100 transition-all duration-300 flex flex-col mb-5 xl:mb-10 overflow-hidden relative`} >
             <Image src={leader.image} alt={leader.name} width={1000} height={1000} className="w-full h-[400px] xl:h-[340px]  2xl:h-[398px] object-contain mx-auto flex mt-auto group-hover:scale-105 transition-all duration-300" />
           </div> 
            <h3 className="text-2xl leading-[1.2] text-black dark:text-white mb-2">{leader.name}</h3>
            <p className="text-lg leading-lh-text19 dark:text-white">{leader.position}</p>
          
          </div>
        ))}
        <div>

        </div>
      </div>
    </div>
  </section>
   );
}
 
export default LeadersList;