"use client";

import BtnPrimary from "../common/BtnPrimary";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import { Project } from "@/types/Projects";
import ProjectCard from "../projects/sections/ProjectCard";

interface Props {
  projects: Project["projects"];
}

const MoreProjects = ({ projects }: Props) => {
  return (
    <section className="pt-47px md:pt-57px pb-13 md:pb-15 xl:pt-57px bg-light-white dark:bg-light-dark">
      <div className="container">
        <div className="flex justify-between items-center pb-5 md:pb-8 xl:pb-[45px] mb-5 md:mb-8 xl:mb-15 border-b dark:border-white/20">
          <motion.h2
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className=" text-4xl 2xl:text-5xl leading-[1.147058823529412] text-black dark:text-white"
          >
            More Projects
          </motion.h2>
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <BtnPrimary link={"/projects"} text="View All" bgtrans={true} />
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-10">
          {projects?.slice(0, 3).map((item, index) => (
            <motion.div
              key={index}
              variants={moveUp((index % 6) * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <ProjectCard item={item} index={index} showDescription={false} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreProjects;
