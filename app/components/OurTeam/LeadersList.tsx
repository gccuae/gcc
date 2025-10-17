"use client";

import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import Image from "next/image";
import { OurTeamProps } from "./type";

const LeadersList = ({ data }: OurTeamProps) => {
  return (
    <section className="pt-15 xl:pt-25px dark:pb-1 dark:bg-light-dark ">
      <div className="container">
        <motion.h2
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-5xl leading-[1.205882352941176] text-black dark:text-white mb-57px"
        >
          {data.firstSection.title}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 md:gap-y-6 xl:gap-y-0 pb-6 xl:pb-[37px] mb-5 md:mb-12 xl:mb-57px border-b border-smgray">
          {data.firstSection.items.map((leader, index) => (
            <motion.div
              variants={moveUp(index * 0.23)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              key={index}
              className="group"
            >
              <div
                className={`${
                  index % 2 === 0 ? "bg-[#ebebeb]" : "bg-[#dfdfdf]"
                } group-hover:bg-gray-100 transition-all duration-300 h-[380px] xl:h-[468px] flex flex-col mb-5 xl:mb-10 overflow-hidden relative`}
              >
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="w-full h-[370px] xl:h-[400px] 2xl:h-[398px] object-contain mx-auto flex mt-auto group-hover:scale-105 transition-all duration-300"
                />
              </div>{" "}
              <h3 className="text-2xl leading-[1.2] text-black dark:text-white xl:mb-3">
                {leader.name}
              </h3>
              <p className="text-lg leading-lh-text19 text-para-color dark:text-white/70 font-light">
                {leader.designation}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadersList;
