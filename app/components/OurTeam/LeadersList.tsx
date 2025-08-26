

import { teamData } from "./data";
import Image from "next/image";

const LeadersList = () => {
  return ( 
    <section className="pt-15 xl:pt-25px ">
      <div className="container">
        <h2 className="text-6xl leading-lh-title text-black dark:text-white mb-57px">{teamData.leadersTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pb-6 xl:pb-[37px] border-b border-smgray mb-6 xl:mb-57px">
          {teamData.leaders.map((leader, index) => (
            <div key={index} className="grid gird-rows-[6fr_1fr_1fr] h-full overflow-hidden relative group">
              <div className={`flex flex-col mb-5 xl:mb-10 transition-all duration-300 overflow-hidden relative`} >
              <div className={`absolute inset-0 z-[-1] group-hover:opacity-50 transition-all duration-300  ${index % 2 === 0 ? "bg-[#ebebeb]" : "bg-[#dfdfdf]"}`}></div>
                <Image src={leader.image} alt={leader.name} width={1000} height={1000} className="w-full h-full xl:h-[398px] object-contain mx-auto flex mt-auto group-hover:scale-105 transition-all duration-300" />
              </div>
              <h3 className="text-2xl leading-lh-text32 text-black dark:text-white">{leader.name}</h3>
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