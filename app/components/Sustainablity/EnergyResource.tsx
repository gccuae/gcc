"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import { SustainabilityType } from "./type";


const EnergyResource = ({ data }: {data:SustainabilityType['secondSection']}) => {
  return (
    <section className="py-57px bg-light-white dark:bg-light-dark">
      <div className="container">
        <motion.h2
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-5xl leading-[1.147058823529412] text-black dark:text-white mb-3 lg:mb-6 tracking-[-1.9px]"
        >
          {data.title}
        </motion.h2>
        <motion.p
          variants={moveUp(0.35)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-lg max-w-[96ch] leading-[1.526315789473684] font-light text-forground dark:text-white/80 hover:text-black dark:hover:text-white transition-colors duration-300"
        >
          {data.description}
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 border border-smgray mt-57px">
          {data.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col border-r border-smgray last:border-r-0 group"
            >
              <div className="border-b border-smgray xl:pt-5 2xl:pr-1 p-5 pb-2 2xl:pb-0  2xl:p-8 xl:pb-0 group-hover:border-b-primary group-hover:border-b-[4px] transition-colors duration-300">
                <motion.div
                  variants={moveUp(0.2)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="group-hover:bg-primary w-[80px] h-[80px] rounded-full transition-colors duration-300 flex items-center justify-center mb-2 lg:mb-4 p-3"
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    width={100}
                    height={100}
                    className="w-[70px] h-[70px] group-hover:brightness-0 group-hover:invert-100 transition-all duration-300"
                  />
                </motion.div>
                <motion.h3
                  variants={moveUp(0.35)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="text-xl max-w-[16ch] 2xl:max-w-[250ch] 2xl:text-2xl leading-[1.3155] dark:text-white pb-3 xl:pb-[27px] text-black"
                >
                  {item.title}
                </motion.h3>
              </div>
              <div className="p-4 xl:p-5 2xl:p-10 2xl:pt-[27px]">
                <motion.p
                  variants={moveUp(0.5)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="text-lg leading-[1.5625] dark:text-white"
                >
                  {item.description}
                </motion.p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnergyResource;
