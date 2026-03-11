"use client";

import SpecialContainer from "../common/SpecialContainer";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveRight, moveUp } from "../motionVarients";
import { MessageSection } from "./type";

const MsgChairman = ({ items }: MessageSection) => {
  const chairmanData = items[0];

  return (
    <section className="pt-[57px] dark:bg-light-dark xl:pb-57px lg:pb-0 bg-[#F5F3F0]">
      <SpecialContainer className="xl:ps-0" side="left">
        <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 items-end gap-6 md:gap-5 xl:gap-13 lg:border-b lg:border-[#c2c2c2] dark:border-light-dark overflow-hidden">
          <motion.div variants={moveRight()} viewport={{ once: true }} initial="hidden" whileInView="show" className="relative pt-10" >
            <div className="absolute top-0 left-0 xl:w-[80%] w-full h-[100%] bg-[#0000001A] dark:bg-black z-0"></div>
            <motion.div variants={moveRight(0.3)} viewport={{ once: true }} initial="hidden" whileInView="show" >
              <Image src={chairmanData?.image} alt="msg chairman" width={1500} height={1500} className="w-full h-[400px] xl:h-[60%] max-h-[900px] object-contain relative z-10" />
            </motion.div>
            <div className="absolute bottom-5 md:bottom-10 lg:bottom-20 left-3 md:left-10 lg:left-30 w-full  xl:w-[70%] h-fit px-4 xl:px-[38px] py-2 xl:py-[18px] bg-gradient-to-r from-primary to-transparent dark:from-[50%] z-20">
              <motion.div variants={moveUp()} viewport={{ once: true }} initial="hidden" whileInView="show" >
                <h3 className="text-2xl leading-[1.147] md:leading-lh-title text-white dark:text-white">
                  {chairmanData?.name}
                </h3>
                <p className="text-lg leading-lh-text19 text-white dark:text-white">
                  {chairmanData?.designation}
                </p>
              </motion.div>
            </div>
          </motion.div>
          {/* <div className="pb-0 lg:pb-6"> */}
          <div>
            <motion.h2 variants={moveUp()} viewport={{ once: true }} initial="hidden" whileInView="show"
              className="text-2xl lg:text-[55px] 3xl:text-6xl leading-lh-title text-black dark:text-white mb-2 md:mb-5 xl:mb-[34px] 3xl:max-w-[16ch]"
            >
              {chairmanData.title}
            </motion.h2>
            <div className="">
              {chairmanData?.message
                .split(/\r?\n/)
                .map((line: string, index: number) => (
                  <motion.p variants={moveUp(index * 0.2)} viewport={{ once: true }} initial="hidden" whileInView="show" key={index}
                    className="mb-3 last:mb-0 lg:last:mb-[17px] xl:last:mb-20 lg:mb-[17px] text-lg leading-lh-text19 text-para-color dark:text-white font-light"
                  >
                    {line}
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
