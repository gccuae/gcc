"use client";
import { projectDetailsData } from "./data";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const DetailsTab = () => {
  const { projectDetails } = projectDetailsData;
  const [activeTab, setActiveTab] = useState(0);
  return (
    <section className="py-57px bg-light-white dark:bg-[#191919]">
      <div className="container">
        <div className="">
          {/* Tab buttons */}
          <div className="relative border-y border-gray-200 dark:border-[#454545] flex flex-col md:flex-row flex-wrap space-x-8 items-baseline">
            {projectDetails.map((tab, idx) => (
              <button key={tab.title} onClick={() => setActiveTab(idx)} className={`py-2 md:py-4 xl:py-[27px] text-xl leading-normal font-medium relative ${activeTab === idx ? "text-black dark:text-white" : "text-gray-500 dark:text-white/70 hover:text-black dark:hover:text-white"}`}>
                {tab.title}
                {activeTab === idx && <motion.div layoutId="underline" className="absolute top-[-2px] left-0 right-0 h-[4px] bg-green-600" transition={{ type: "spring", duration: 0.5 }} />}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
           className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-[70px] xl:grid-cols-[934px_auto] items-start">
            {/* Text */}
            <div className="space-y-4">
              {projectDetails[activeTab].description.map((para, i) => (
                <p key={i} className="text-21 leading-[1.380952380952381] dark:text-white/70">{para}</p>
              ))}
            </div>

            {/* Image */}
            <div className="relative w-full h-64 md:h-96">
              <Image src={projectDetails[activeTab].image} alt={projectDetails[activeTab].title} fill className="object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default DetailsTab;