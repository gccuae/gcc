"use client";

import { motion } from "framer-motion";
import SpecialContainer from "../common/SpecialContainer";
import Image from "next/image";
import { moveLeft, moveUp } from "../../components/motionVarients";
import { MessageSection } from "./type";

const MsgGm = ({ items }: MessageSection) => {
  const gmData = items[1];

  return (
    <section className="pb-57px lg:pb-[101px] dark:bg-black overflow-hidden bg-[#F5F3F0] pt-57px xl:pt-[180px]">
      <SpecialContainer className="" side="right">
        <div className="flex flex-col-reverse lg:grid grid-cols-1 lg:grid-cols-2 lg:items-end gap-6 md:gap-8 lg:border-b lg:border-[#c2c2c2] dark:border-[#797979]">
          <div className="">
            <motion.h2
              variants={moveUp()}
              viewport={{ once: true }}
              initial="hidden"
              whileInView="show"
              className="text-2xl lg:text-6xl leading-[1.2] xl:leading-lh-title text-black dark:text-white   mb-2 md:mb-5 xl:mb-[34px] lg:max-w-[10ch]"
            >
              {gmData?.title}
            </motion.h2>
            <div className="lg:max-w-[72ch] pb-0 lg:pb-6">
              {gmData?.message
                .split(/\r?\n/)
                .map((line: string, index: number) => (
                  <motion.p
                    variants={moveUp(index * 0.2)}
                    viewport={{ once: true }}
                    initial="hidden"
                    whileInView="show"
                    key={index}
                    className="mb-3 last:mb-0 lg:last:mb-[17px]  lg:mb-[17px] text-lg leading-lh-text19 text-para-color dark:text-white font-light"
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
            className="relative pt-10"
          >
            <div className="absolute top-0 right-0 w-[85%] h-full bg-[#0000001A] dark:bg-[#F5F3F0] z-0"></div>
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
                className="img-fluid   h-[400px] lg:h-[60%] max-h-[980px] object-contain relative right-0 md:right-14 z-10"
              />
            </motion.div>
            <div className="absolute bottom-5 md:bottom-10 lg:bottom-20 right-0 md:left-50 lg:left-40 w-fit h-fit px-4 xl:px-[38px] py-2 xl:py-[18px] bg-gradient-to-r from-primary to-transparent dark:bg-[#0d0d0d] z-20">
              <motion.div
                variants={moveUp()}
                viewport={{ once: true }}
                initial="hidden"
                whileInView="show"
              >
                <h3 className="text-2xl leading-lh-title text-white dark:text-white ">
                  {gmData?.name}
                </h3>
                <p className="text-lg leading-[1.147] md:leading-lh-text19 text-white dark:text-white">
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
