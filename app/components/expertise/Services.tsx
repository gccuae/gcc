"use client";

import { moveUp } from "../motionVarients";
import ExpertiseCard from "./ExpertiseCard";
import { motion } from "framer-motion";
import { SecondSection } from "./type";

interface ServicesProps {
  data: SecondSection;
}

const Services = ({ data }: ServicesProps) => {
  return (
    <section className="py-57px bg-light-white dark:bg-light-dark">
      <div className="container">
        <motion.h2
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-5xl leading-[1.147058823529412] text-black dark:text-white pb-6 xl:pb-[47px]"
        >
          {data.title}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-6  xl:gap-x-[30px] xl:gap-y-[37px]">
          {data.items.map((item, index) => (
            <motion.div
              variants={moveUp(index * 0.15)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              key={index}
            >
              <ExpertiseCard item={item} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
