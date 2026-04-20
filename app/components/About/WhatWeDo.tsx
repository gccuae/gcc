"use client";
import SpecialContainer from "../common/SpecialContainer";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { moveUp } from "../motionVarients";
import { WhatWeDoProps } from "./type";
import Link from "next/link";
import { ExpertiseData } from "../expertise/type";

interface WhatWeDoComponentProps {
  data: WhatWeDoProps;
  expertiseData: ExpertiseData["secondSection"];
}

const WhatWeDo = ({ data, expertiseData }: WhatWeDoComponentProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className={`bg-light-white dark:bg-light-dark overflow-hidden ${data.hidden ? "hidden" : ""}`}>
      <div className="border-b dark:border-white/20 dark:border-white/20">
        <div className="container pt-47px pb-5 xl:py-57px">
          <motion.h2
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className=" text-4xl xl:text-5xl leading-lh-title text-black dark:text-white mb-4 lg:mb-[13px]"
          >
            {data.mainTitle}
          </motion.h2>
          <motion.h3
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-xl xl:text-2xl leading-[1.2]  xl:leading-[1.5625] dark:text-white text-para-color"
          >
            {data.subTitle}
          </motion.h3>
        </div>
      </div>
      <SpecialContainer className="pl-[15px]" side="right">
        <motion.div variants={moveUp()} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[52%_48%] items-stretch" >
          <div className="md:pr-3 xl:pr-70px lg:border-r dark:border-white/20 dark:border-white/20  py-5 lg:py-4 xl:pt-[86px] xl:pb-[90px] flex flex-col ">
            <motion.p variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-lg leading-lh-text19 dark:text-white mb-4 xl:mb-10 text-para-color" >
              {data.firstDescription}
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 xl:gap-x-50px mb-7 xl:mb-14 ">
              {expertiseData.items.map((item, index) => (
                <motion.button
                  variants={moveUp(index * 0.17)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  key={index}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`flex items-center gap-2 w-full justify-between border-b dark:border-white/20  group cursor-pointer dark:text-white ${index === activeIndex ? "text-black dark:text-primary" : ""
                    }`}
                >
                  <Link href={`expertise/${item?.slug || "#"}`}>
                    <p className="text-xl leading-[1.2] py-4 md:py-5 text-left group-hover:text-primary group-hover:scale-[1.03] transition-all duration-400 dark:group-hover:text-primary ">
                      {item.title}
                    </p>
                  </Link>
                  {index === activeIndex && (
                    <Image
                      src="/assets/img/icons/arrow-tr-green.svg"
                      alt="what we do"
                      width={19.05}
                      height={19.05}
                      className={`opacity-0 translate-x-[-4px] translate-y-[4px] group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ${index === activeIndex ? "opacity-100" : "opacity-0"
                        }`}
                    />
                  )}
                </motion.button>
              ))}
            </div>
            <motion.p
              variants={moveUp(1.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-lg leading-lh-text19 dark:text-white text-para-color"
            >
              {data.secondDescription}
            </motion.p>
          </div>
          <div className="pt-2 pb-10 md:py-5 xl:py-10 pl-0 lg:pl-5 xl:pl-10  relative overflow-hidden 3xl:max-h-[715px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full flex flex-col justify-center"
              >
                <Image
                  src={expertiseData.items[activeIndex].image}
                  alt={data.items[activeIndex].title}
                  width={1840}
                  height={1700}
                  className="w-full h-full max-h-[36vh] lg:max-h-full object-cover border-8 border-white dark:border-black"
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
