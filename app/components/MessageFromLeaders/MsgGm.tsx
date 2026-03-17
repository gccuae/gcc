"use client";

import { motion } from "framer-motion";
import SpecialContainer from "../common/SpecialContainer";
import Image from "next/image";
import { moveLeft, moveUp } from "../../components/motionVarients";
import { MessageSection } from "./type";

const MsgGm = ({ items }: MessageSection) => {
  const gmData = items[1];

  return (
    <section className="pb-13 md:pb-15 xl::pb-25 dark:bg-black overflow-hidden bg-[#F5F3F0] pt-57px xl:pt-[180px]">
      <SpecialContainer className="" side="right">
        <div className="flex flex-col lg:grid grid-cols-1 xl:grid-cols-2 lg:items-center gap-6 md:gap-8 lg:border-b lg:border-[#c2c2c2] dark:border-transparent overflow-hidden">
          <div className="max-xl:order-2">
            <motion.h2
              variants={moveUp()}
              viewport={{ once: true }}
              initial="hidden"
              whileInView="show"
              className="text-2xl lg:text-[55px] 3xl:text-6xl leading-[1.2] xl:leading-lh-title text-black dark:text-white   mb-2 md:mb-5 xl:mb-[34px] 2xl:max-w-[10ch]"
            >
              {gmData?.title}
            </motion.h2>
            {/* <div className="lg:max-w-[72ch] pb-0 lg:pb-6"> */}
            <div>
              {gmData?.message
                .split(/\r?\n/)
                .map((line: string, index: number) => (
                  <motion.p
                    variants={moveUp(index * 0.2)}
                    viewport={{ once: true }}
                    initial="hidden"
                    whileInView="show"
                    key={index}
                    className="mb-3 last:mb-0 lg:last:mb-[17px] xl:last:mb-20 lg:mb-[17px] text-lg leading-lh-text19 text-para-color dark:text-white font-light"
                  >
                    {line}
                  </motion.p>
                ))}
            </div>
          </div>
          <motion.div
            variants={moveLeft()}
            viewport={{ once: true }}
            initial="hidden"
            whileInView="show"
            className="relative pt-10 dark:bg-light-dark"
          >
            <div className="absolute top-0 right-0 w-full xl:w-[85%] h-full bg-[#0000001A] dark:bg-light-dark z-0"></div>
            <motion.div
              variants={moveLeft(0.3)}
              viewport={{ once: true }}
              initial="hidden"
              whileInView="show"
            >
              <Image
                src={gmData?.image}
                alt={gmData?.imageAlt}
                width={1500}
                height={1500}
                className="img-fluid h-[300px] md:h-[400px] xl:h-[60%] max-h-[750px] object-contain relative right-0 md:right-14 z-10"
              />
            </motion.div>
            <div className="absolute bottom-5 md:bottom-10 lg:bottom-20 right-0 md:left-50 lg:left-40 w-full xl:w-fit h-fit px-4 xl:px-[38px] py-2 xl:py-[18px] bg-gradient-to-r from-primary to-transparent dark:from-[50%] z-20">
              <motion.div
                variants={moveUp()}
                viewport={{ once: true }}
                initial="hidden"
                whileInView="show"
              >
                <h3 className="text-xl md:text-2xl leading-lh-title text-white dark:text-white ">
                  {gmData?.name}
                </h3>
                <p className="text-sm md:text-lg leading-[1.147] md:leading-lh-text19 text-white dark:text-white">
                  {gmData?.designation}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </SpecialContainer>
    </section>
  );
};

export default MsgGm;
