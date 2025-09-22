"use client";
import SpecialContainer from "../common/SpecialContainer";
import { aboutData } from "./data";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { moveUp } from "../motionVarients";
const WhatWeDo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className="bg-light-white dark:bg-[#0d0d0d] overflow-hidden">
      <div className="border-b border-smgray">
        <div className="container pt-57px pb-5 xl:py-57px">
          <motion.h2
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-6xl leading-lh-title text-black dark:text-white mb-4 lg:mb-2"
          >
            What We Do
          </motion.h2>
          <motion.h3
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-2xl leading-[1.2]  lg:leading-[1.5625] dark:text-white"
          >
            Unlocking Potential Through Construction Excellence
          </motion.h3>
        </div>
      </div>
      <SpecialContainer className="pl-[15px]" side="right">
        <motion.div
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[52%_48%]"
        >
          <div className="md:pr-3 xl:pr-70px lg:border-r border-smgray py-5 lg:py-4 xl:pt-[86px] xl:pb-[90px] flex flex-col justify-between">
            <motion.p
              variants={moveUp(0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-lg leading-lh-text19 dark:text-white mb-4 xl:mb-10"
            >
              {aboutData.whatWeDo.descTop}
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 xl:gap-x-50px mb-7 xl:mb-10 ">
              {aboutData.whatWeDo.items.map((item, index) => (
                <motion.button
                  variants={moveUp(index * 0.17)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`flex items-center gap-2 w-full justify-between border-b border-smgray group cursor-pointer dark:text-white ${
                    index === activeIndex ? "text-black dark:text-primary" : ""
                  }`}
                >
                  <p className="text-xl leading-[1.2] py-4 md:py-5 text-left group-hover:text-black transition-all duration-300 dark:group-hover:text-primary ">
                    {item.title}
                  </p>
                  <Image
                    src={aboutData.whatWeDo.arrowIcon}
                    alt="what we do"
                    width={19.05}
                    height={19.05}
                    className={`opacity-0 group-hover:opacity-100 translate-x-[-4px] translate-y-[4px]  group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ${
                      index === activeIndex ? "opacity-100" : ""
                    }`}
                  />
                </motion.button>
              ))}
            </div>
            <motion.p
              variants={moveUp(1.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-lg leading-lh-text19 dark:text-white "
            >
              {aboutData.whatWeDo.descBottom}
            </motion.p>
          </div>
          <div className="pt-2 pb-10 md:py-5 lg:pl-5 xl:py-10 xl:pl-10 relative overflow-hidden lg:min-h-[800px]">
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
                  className="w-full   h-[350px] md:max-h-[700px] object-cover "
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </SpecialContainer>
    </section>
  );
};

export default WhatWeDo;
