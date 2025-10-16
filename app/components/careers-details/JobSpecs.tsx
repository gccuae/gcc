"use client";

import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import { careerData } from "../careers/type";



const JobSpecs = ({data}: {data: careerData['openings'][number]['firstSection']}) => {

  const jobSpecs = [
  { label: "Job Title", value: data.jobTitle },
  { label: "Department", value: data.department },
  { label: "Location", value: data.location },
  { label: "Employment Type", value: data.employmentType },
];

  return (
    <section className="dark:bg-black pt-57px">
      <motion.div
        className="container"
        variants={moveUp()}
        initial="hidden"
        whileInView="show"
      >
        {/* Section Heading */}
        <div className="pb-57px">
          <h2 className="text-2xl leading-lh-text32 font-normal text-black dark:text-white">
            {data.title}
          </h2>
        </div>

        {/* Specs Grid */}
        <motion.div
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 xl:gap-[63px] md:pb-57px md:border-b border-smgray"
        >
          {jobSpecs.map((spec, index) => (
            <motion.div
              key={index}
              variants={moveUp(index * 0.25)}
              initial="hidden"
              whileInView="show"
              className="pt-3 md:pt-27px border-t border-smgray"
            >
              <h3 className="leading-[1.5625] font-light text-base uppercase text-black dark:text-white">
                {spec.label}
              </h3>
              <p className="text-lg leading-lh-text19 font-medium text-lg text-foreground dark:text-white">
                {spec.value}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default JobSpecs;
