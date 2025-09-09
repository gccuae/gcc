"use client";
import SpecialContainer from "../common/SpecialContainer";
import { aboutData } from "./data";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const WhatWeDo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className="bg-light-white dark:bg-[#0d0d0d] overflow-hidden">
      <div className="border-b border-smgray">
        <div className="container xl:py-57px">
          <h2 className="text-6xl leading-lh-title text-black dark:text-white">What We Do</h2>
          <h3 className="text-2xl leading-[1.5625] dark:text-white">Unlocking Potential Through Construction Excellence</h3>
        </div>
      </div>
      <SpecialContainer className="pl-[15px]" side="right">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[52%_48%] ">
          <div className="xl:pr-70px border-r border-smgray py-4 xl:pt-[86px] xl:pb-[90px] flex flex-col justify-between">
            <p className="text-lg leading-lh-text19 dark:text-white mb-4 xl:mb-10">{aboutData.whatWeDo.descTop}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 xl:gap-x-50px mb-4 xl:mb-10 ">
              {aboutData.whatWeDo.items.map((item, index) => (
                <button key={index} onClick={() => setActiveIndex(index)} className={`flex items-center gap-2 w-full justify-between border-b border-smgray group cursor-pointer dark:text-white ${index === activeIndex ? 'text-black dark:text-primary' : ''}`}>
                  <p className="text-xl leading-[2.782608695652174] group-hover:text-black transition-all duration-300 dark:group-hover:text-primary ">{item.title}</p>
                  <Image src={aboutData.whatWeDo.arrowIcon} alt="what we do" width={19.05} height={19.05} className={`opacity-0 group-hover:opacity-100 translate-x-[-4px] translate-y-[4px]  group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ${index === activeIndex ? 'opacity-100' : ''}`}/>
                </button>
              ))}
            </div>
            <p className="text-lg leading-lh-text19 dark:text-white ">
              {aboutData.whatWeDo.descBottom}
            </p>
          </div>
          <div className="py-5 pl-5 xl:py-10 xl:pl-10 relative overflow-hidden min-h-[800px] ">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -200, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full flex flex-col justify-center"
              >
                <Image
                  src={aboutData.whatWeDo.items[activeIndex].image}
                  alt={aboutData.whatWeDo.items[activeIndex].title}
                  width={1500}
                  height={1500}
                  className="w-full h-full xl:max-h-[700px] object-cover "
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </SpecialContainer>
    </section>
  );
}

export default WhatWeDo;