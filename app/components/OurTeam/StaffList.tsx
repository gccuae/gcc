
"use client"
import { teamData } from "./data";
import Image from "next/image";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
const StaffList = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  // Get unique categories from staff data
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(teamData.staffs.map(staff => staff.category)))
    return ['All', ...uniqueCategories]
  }, [])

  // Filter staff based on active category
  const filteredStaff = useMemo(() => {
    if (activeCategory === 'All') {
      return teamData.staffs
    }
    return teamData.staffs.filter(staff => staff.category === activeCategory)
  }, [activeCategory])

  return (
    <section className="bg-black py-57px">
      <div className="container">
        <h2 className="text-6xl leading-lh-title text-white mb-57px">{teamData.staffTitle}</h2>

        {/* Tab Navigation */}
        <div className="mb-12 w-full">
          <div className="flex flex-wrap justify-between min-w-max w-full border-t border-smgray">
            {categories.map((category) => (
              <button key={category} onClick={() => setActiveCategory(category)}
                className={`text-center py-2 text-xl font-light transition-all duration-300 whitespace-nowrap flex-grow relative first:text-left 
                  ${activeCategory === category
                    ? ' text-white '
                    : ' text-white/70 hover:text-white'
                  }
                `}
              >
                {category}
                <span className={activeCategory === category ? 'absolute top-[-6px] left-0 w-full h-[6px] bg-accent' : 'w-0'}></span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 xl:gap-y-57px`">
          {filteredStaff.map((staff, index) => (
            <motion.div variants={moveUp(index * 0.5)} initial="hidden" whileInView="show" key={`${staff.name}-${activeCategory}`} className="grid gird-rows-[6fr_1fr_1fr] h-full pb-6 xl:pb-[37px] border-b border-white  mb-6 xl:mb-57px  overflow-hidden relative group"
              style={{
                animationDelay: `${index * 100}ms`
              }}>
              <div className={`flex flex-col mb-5 xl:mb-10 transition-all duration-300 overflow-hidden relative`} >
                <div className={`absolute inset-0 z-10 group-hover:opacity-75 transition-all duration-300  ${index % 2 === 0 ? "bg-[#ebebeb]" : "bg-[#dfdfdf]"}`}></div>
                <Image src={staff.image} alt={staff.name} width={1000} height={1000} className="w-full h-full xl:h-[398px] object-contain mx-auto flex mt-auto group-hover:scale-105 transition-all duration-300 relative z-20 grayscale-100 group-hover:grayscale-0" />
              </div>
              <h3 className="text-2xl leading-lh-text32 text-white/80">{staff.name}</h3>
              <p className="text-lg leading-lh-text19 text-white/70">{staff.position}</p>
            </motion.div>
          ))}
          <div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default StaffList;