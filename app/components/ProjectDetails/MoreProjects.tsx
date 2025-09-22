"use client";

import BtnPrimary from "../common/BtnPrimary";
import { projectDetailsData } from "./data";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";

const MoreProjects = () => {
  return ( 
    <section className="py-57px bg-light-white dark:bg-[#191919]">
      <div className="container">
        <div className="flex justify-between items-center pb-8 xl:pb-[45px] mb-8 xl:mb-15 border-b border-smgray">
          <motion.h2
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-5xl leading-[1.147058823529412] text-black dark:text-white"
          >
            More Projects
          </motion.h2>
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <BtnPrimary link={"#"} text="View All" bgtrans={true} />
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-10">
          {projectDetailsData.moreProjects.map((project, index) => (
            <motion.div
              key={index}
              className="group border-b border-smgray pb-27px"
              variants={moveUp(index * 0.24)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={1000}
                  height={1000}
                  className="object-cover w-full h-[300px] md:h-400px] lg:h-auto"
                />
              </div>
              <div className="pt-5 xl:pt-[27px]">
                <p className="text-lg leading-lh-text19 dark:text-white/80 mb-2 xl:mb-[12px]">
                  {project.info.type} <span className="mx-2">|</span>{" "}
                  {project.info.sector} <span className="mx-2">|</span>{" "}
                  {project.info.location}
                </p>
                <h3 className="text-2xl leading-normal text-black dark:text-white ">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreProjects;
