
"use client"
import { teamData } from "./data";
import Image from "next/image";
import { useState, useMemo } from "react";
import { motion } from "framer-motion"; 
const StaffList = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [openAccordion, setOpenAccordion] = useState<string | null> (null);

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
      <h2 className="text-6xl leading-lh-title text-white mb-6 lg:mb-14">
        {teamData.staffTitle}
      </h2>

      {/* DESKTOP TABS */}
      <div className="hidden xl:block mb-12 w-full">
        <div className="flex flex-wrap justify-between min-w-max w-full border-t border-smgray">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`text-center py-2 text-xl font-light transition-all duration-300 whitespace-nowrap flex-grow relative first:text-left 
                ${
                  activeCategory === category
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }
              `}
            >
              {category}
              <span
                className={
                  activeCategory === category
                    ? "absolute top-[-6px] left-0 w-full h-[6px] bg-accent"
                    : "w-0"
                }
              ></span>
            </button>
          ))}
        </div>
      </div>

      {/* MOBILE ACCORDION */}
      <div className="xl:hidden space-y-4">
  {categories.map((category) => (
    <div key={category} className="border border-smgray rounded-lg">
      <button
        onClick={() =>
          setOpenAccordion(openAccordion === category ? null : category)
        }
        className="w-full flex justify-between items-center px-4 py-3 text-lg text-white"
      >
        {category}
        <span>{openAccordion === category ? "−" : "+"}</span>
      </button>

      {openAccordion === category && (
        <div className="p-4 border-t border-smgray">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8">
            {(category === "All"
              ? teamData.staffs
              : teamData.staffs.filter((staff) => staff.category === category)
            ).map((staff, index) => (
              <motion.div
                key={`${staff.name}-${category}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div
                  className={`${
                    index % 2 === 0 ? "bg-[#ebebeb]" : "bg-[#dfdfdf]"
                  } group-hover:bg-gray-100 transition-all duration-300 flex flex-col mb-6 overflow-hidden relative`}
                >
                  <Image
                    src={staff.image}
                    alt={staff.name}
                    width={1000}
                    height={1000}
                    className="w-full h-[280px] object-contain mx-auto grayscale-100 group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h3 className="text-2xl text-white/80">{staff.name}</h3>
                <p className="text-lg text-white/70">{staff.position}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  ))}
</div>

      {/* DESKTOP GRID */}
      <div className="hidden xl:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 xl:gap-y-14">
        {filteredStaff.map((staff, index) => (
          <motion.div
            key={`${staff.name}-${activeCategory}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          > 
            <div className={`${index % 2 === 0 ? "bg-[#ebebeb]" : "bg-[#dfdfdf]"} group-hover:bg-gray-100 transition-all duration-300 flex flex-col mb-6   overflow-hidden relative`} >
            
              <Image
                src={staff.image}
                alt={staff.name}
                width={1000}
                height={1000}
                className="w-full h-[300px] xl:h-[398px] object-contain mx-auto grayscale-100 hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <h3 className="text-2xl text-white/80">{staff.name}</h3>
            <p className="text-lg text-white/70">{staff.position}</p>
          </motion.div>
        ))}
      </div>
    </div>
    </section>
  );
}

export default StaffList;