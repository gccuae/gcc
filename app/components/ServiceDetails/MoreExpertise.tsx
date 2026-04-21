"use client";

import { serviceDetailsData } from "./data";
import ExpertiseCard from "../expertise/ExpertiseCard";
import BtnPrimary from "../common/BtnPrimary";
import { SecondSectionItem } from "../expertise/type";

import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";

interface MoreExpertiseProps {
  allServices: SecondSectionItem[];
  exclude: string;
}

const MoreExpertise = ({ allServices, exclude }: MoreExpertiseProps) => {
  const filteredServices = allServices.filter(
    (service) => service._id !== exclude
  );
  return (
    <section className="pt-37px pb-47px xl:py-57px bg-light-white dark:bg-black">
      <div className="container">
        <div className="flex flex-wrap gap-y-3 justify-between items-center pb-5 md:pb-8 xl:pb-47px mb-5 md:mb-8 xl:mb-47px border-b dark:border-white/20">
          <motion.h2
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className=" text-4xl 2xl:text-5xl leading-[1.147058823529412] text-black dark:text-white"
          >
            {serviceDetailsData.moreExperiences.title}
          </motion.h2>
          <motion.div
            variants={moveUp(0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex items-center gap-6"
          >
            <BtnPrimary link={"/expertise"} text="View All" bgtrans={true} />
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-[30px]">
          {filteredServices.slice(0, 3).map((item, index) => (
            <motion.div
              key={index}
              variants={moveUp((index % 3) * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="col-span-1"
            >
              <ExpertiseCard item={item} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreExpertise;
