"use client";

import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import { ForthSection } from "./type";

const HIghlights = ({ data }: { data: ForthSection }) => {
  return (
    <section className="pt-47px pb-47px md:pt-57px md:pb-57px bg-[#F5F3F0] dark:bg-black">
      <div className="container">
        <motion.h2
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className=" text-4xl 2xl:text-5xl  leading-[1.147058823529412] text-black dark:text-white mb-4 md:mb-57px max-w-[90ch]"
        >
          {data.title}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-20">
          {data.items.map((item, index) => (
            <motion.div
              variants={moveUp(index * 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              key={index}
              className="group grid grid-rows-subgrid row-span-2 gap-0"
            >
              <div className="border-b dark:border-white/20 group-hover:border-b-primary pb-4 xl:pb-30px transition-all duration-300">
                <h3 className="text-xl xl:text-2xl leading-[1.12] xl:leading-[1.5625] text-black dark:text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-lg leading-[1.5625] text-para-color dark:text-white/70 font-light pt-3 xl:pt-30px">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HIghlights;
