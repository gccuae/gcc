"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";

const MainContent = ({
  subTitle,
  image,
  sector,
  date,
  desc,
}: {
  subTitle: string;
  image: string;
  sector: string;
  date: string;
  desc: string[];
}) => {
  return (
    <div>
      <motion.h3
        variants={moveUp()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-2xl leading-lh-text32 font-normal mb-5 xl:mb-[27px] text-black dark:text-white"
      >
        {subTitle}
      </motion.h3>
      <motion.div
        variants={moveUp(0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Image
          src={image}
          alt=""
          width={1920}
          height={1280}
          className="w-full h-auto max-h-[600px] object-cover"
        />
      </motion.div>
      <motion.div
        variants={moveUp(0.4)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex items-center justify-between mb-3 md:mb-5 xl:mb-[27px] mt-3 xl:mt-[17px] gap-3 text-foreground dark:text-white/70"
      >
        <span className="text-[16px] uppercase">{sector}</span>
        <span className="text-[16px]">{date}</span>
      </motion.div>
      {desc.map((item, index) => (
        <motion.p
          key={index}
          className="mb-5 xl:mb-[27px] text-lg xl:text-21 leading-[1.380952380952381] font-normal text-foreground dark:text-white/70"
          variants={moveUp(index * 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {item}
        </motion.p>
      ))}
    </div>
  );
};

export default MainContent;
