"use client";

import SpecialContainer from "../common/SpecialContainer";
import { leadersData } from "./data";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveLeft, moveRight, moveUp } from "../motionVarients";

const MsgChairman = () => {
  return (
    <section className="pt-57px xl:pt-[105px] mb-57px xl:mb-[101px] dark:bg-black">
      <SpecialContainer className="" side="left">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 xl:gap-15">
          <motion.div
            variants={moveRight()}
            initial="hidden"
            whileInView="show"
            className="relative pt-10"
          >
            <div className="absolute top-0 left-0 w-[80%] h-full bg-light-white dark:bg-[#0d0d0d] z-0"></div>
            <motion.div
              variants={moveRight(0.3)}
              initial="hidden"
              whileInView="show"
            >
              <Image
                src={leadersData.chairman.image}
                alt="msg chairman"
                width={1500}
                height={1500}
                className="w-full h-[60%] max-h-[980px] object-contain relative z-10"
              />
            </motion.div>
            <div className="absolute bottom-20 left-30 w-[70%] h-fit px-4 xl:px-[38px] py-2 xl:py-[18px] bg-gradient-to-r from-primary to-transparent dark:bg-[#0d0d0d] z-20">
              <motion.div
                variants={moveUp()}
                initial="hidden"
                whileInView="show"
              >
                <h3 className="text-2xl leading-lh-title text-white dark:text-white">
                  {leadersData.chairman.name}
                </h3>
                <p className="text-lg leading-lh-text19 text-white dark:text-white">
                  {leadersData.chairman.position}
                </p>
              </motion.div>
            </div>
          </motion.div>
          <div className="">
            <motion.h2
              variants={moveUp()}
              initial="hidden"
              whileInView="show"
              className="text-6xl leading-lh-title text-black dark:text-white mb-5 xl:mb-[34px]"
            >
              {leadersData.chairman.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="block">
                {leadersData.chairman.title.split(" ").slice(-1)}
              </span>
            </motion.h2>

            <div>
              {leadersData.chairman.desc.map((item, index) => (
                <motion.p
                  variants={moveUp(index * 0.2)}
                  initial="hidden"
                  whileInView="show"
                  key={index}
                  className="mb-4 xl:mb-[17px] text-lg leading-lh-text19 text-foreground dark:text-white font-light"
                >
                  {item}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </SpecialContainer>
    </section>
  );
};

export default MsgChairman;
