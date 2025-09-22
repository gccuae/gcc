"use client";

import StandardBnr from "../common/StandardBnr";
import { motion } from "framer-motion";
import { moveUp } from "../../components/motionVarients";

const Main = () => {
  return (
    <section className="pt-57px xl:pt-25   dark:bg-[#191919]">
      <div className="container">
        <StandardBnr title="Civil & Structural Works" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 xl:gap-10 justify-items-between  lg:pt-[23px] pb-7 lg:pb-10 xl:pb-20">
          <div>
            <motion.h2
              variants={moveUp()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-3xl leading-lh-text48 font-normal text-black dark:text-white"
            >
              Building Excellence in Every Project
            </motion.h2>
          </div>
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className=""
          >
            <p className="text-lg leading-lh-text19 text-black dark:text-white">
              <span className="text-primary">
                Gulf Contractors Company (GCC)
              </span>{" "}
              is a trusted name in delivering high-quality civil construction
              solutions across the UAE. With decades of experience and a team of
              skilled professionals, we bring innovation, precision, and safety
              to every project from large-scale commercial developments to
              complex infrastructure works.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Main;
