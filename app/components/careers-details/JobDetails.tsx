"use client";

import BtnPrimary from "../common/BtnPrimary";
import { motion } from "framer-motion";
import { moveUp } from "../../components/motionVarients";
import { jobDetails } from "./data";

const JobDetails = () => {
  return (
    <section className="dark:bg-[#0d0d0d]">
      <div className="container">
        {/* About the Role */}
        <div className="pt-47px pb-57px border-b border-smgray">
          <motion.h2
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            className="text-2xl leading-lh-text32 text-black dark:text-white mb-27px"
          >
            About the Role
          </motion.h2>
          {jobDetails.about.map((para, idx) => (
            <motion.p
              key={idx}
              variants={moveUp(idx * 0.2)}
              initial="hidden"
              whileInView="show"
              className="text-lg leading-lh-text19 mb-2 font-light"
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Key Responsibilities */}
        <div className="pt-47px pb-57px border-b border-smgray">
          <h2 className="text-2xl leading-lh-text32 text-black dark:text-white mb-27px">
            Key Responsibilities
          </h2>
          <div className="flex flex-col gap-37px">
            {jobDetails.responsibilities.map((section, idx) => (
              <motion.div
                variants={moveUp(idx * 0.2)}
                initial="hidden"
                whileInView="show"
                key={idx}
              >
                <h3 className="text-lg leading-lh-text19 font-medium text-forground dark:text-white mb-3 xl:mb-5">
                  {section.title}
                </h3>
                <ul className="square-list list-inside">
                  {section.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-lg leading-lh-text19 font-light"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Apply Now */}
        <div className="pt-47px pb-57px border-b border-smgray">
          <motion.h3
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            className="text-2xl leading-lh-text32 text-black dark:text-white mb-27px"
          >
            {jobDetails.apply.heading}
          </motion.h3>
          <motion.p
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            className="text-lg leading-lh-text19 font-light dark:text-white mb-27px"
          >
            {jobDetails.apply.description}
          </motion.p>
          <motion.div
            variants={moveUp(0.4)}
            initial="hidden"
            whileInView="show"
          >
            <BtnPrimary
              link={jobDetails.apply.button.link}
              text={jobDetails.apply.button.text}
              bgtrans={true}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
