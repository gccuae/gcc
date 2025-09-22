"use client";

import { serviceDetailsData } from "./data";
import ExpertiseCard from "../expertise/ExpertiseCard";
import BtnPrimary from "../common/BtnPrimary";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";

const MoreExpertise = () => {
  return (
    <section className="py-57px bg-light-white dark:bg-black">
      <div className="container">
        <div className="flex justify-between items-center pb-8 xl:pb-[45px] mb-8 xl:mb-15 border-b border-smgray">
          <motion.h2
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-5xl leading-[1.147058823529412] text-black dark:text-white"
          >
            {serviceDetailsData.moreExperiences.title}
          </motion.h2>
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex items-center gap-6"
          >
            <BtnPrimary link={"#"} text="View All" bgtrans={true} />
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-10">
          {serviceDetailsData.moreExperiences.items.map((item, index) => (
            <motion.div
              key={index}
              variants={moveUp(index * 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="col-span-1"
            >
              <ExpertiseCard key={index} item={item} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreExpertise;
