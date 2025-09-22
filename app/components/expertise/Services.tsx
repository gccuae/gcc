"use client";

import { moveUp } from "../motionVarients";
import { expertiseData } from "./data";
import ExpertiseCard from "./ExpertiseCard";
import { motion } from "framer-motion";

const Services = () => {
  return (
    <section className="py-57px bg-light-white dark:bg-black">
      <div className="container">
        <motion.h2
          variants={moveUp()}
          initial="initial"
          animate="show"
          viewport={{ once: true }}
          className="text-5xl leading-[1.147058823529412] text-black dark:text-white pb-6 xl:pb-57px"
        >
          Services for Any Project
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-6  xl:gap-x-[30px] xl:gap-y-[37px]">
          {expertiseData.services.items.map((item, index) => (
            <motion.div
              variants={moveUp(index * 0.15)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              key={index}
            >F
              <ExpertiseCard item={item} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
