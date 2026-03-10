"use client";

import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import { ForthSection } from "./type";

const HIghlights = ({ data }: { data: ForthSection }) => {
  return (
    <section className="py-57px bg-[#F5F3F0] dark:bg-black">
      <div className="container">
        <motion.h2
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-5xl xl:text-6xl leading-[1.147058823529412] text-black dark:text-white mb-57px max-w-4xl"
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
              className="group grid gap-30px grid-rows-[auto_1fr]"
            >
              <div className="border-b dark:border-white/20 group-hover:border-b-primary pb-30px transition-all duration-300">
                <h3 className="text-2xl leading-[1.12] xl:leading-[1.5625] text-black dark:text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-lg leading-[1.5625] text-para-color dark:text-white/70 font-light">
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
