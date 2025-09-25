"use client";

import SpecialContainer from "../common/SpecialContainer";
import { leadersData } from "./data";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveRight, moveUp } from "../motionVarients";

const MsgChairman = () => {
  return (
    <section className="pt-57px xl:pt-[105px] mb-57px xl:mb-[101px]  dark:bg-light-dark pb-57px lg:pb-0">
      <SpecialContainer className="lg:ps-0" side="left">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-6 md:gap-10 xl:gap-15 lg:border-b lg:border-[#c2c2c2] dark:border-light-dark">
          <motion.div
            variants={moveRight()}
            viewport={{ once: true }}
            initial="hidden"
            whileInView="show"
            className="relative pt-10"
          >
            <div className="absolute top-0 left-0 w-[80%] h-[100%] bg-light-white dark:bg-[#797979] z-0"></div>
            <motion.div
              variants={moveRight(0.3)}
              viewport={{ once: true }}
              initial="hidden"
              whileInView="show"
            >
              <Image
                src={leadersData.chairman.image}
                alt="msg chairman"
                width={1500}
                height={1500}
                className="w-full h-[400px] lg:h-[60%] max-h-[980px] object-contain relative z-10"
              />
            </motion.div>
            <div className="absolute bottom-5 md:bottom-10 lg:bottom-20 left-3 md:left-10 lg:left-30 w-[70%] lg:w-[70%] h-fit px-4 xl:px-[38px] py-2 xl:py-[18px] bg-gradient-to-r from-primary to-transparent dark:bg-[#0d0d0d] z-20">
              <motion.div
                variants={moveUp()}
                viewport={{ once: true }}
                initial="hidden"
                whileInView="show"
              >
                <h3 className="text-2xl leading-[1.147] md:leading-lh-title text-white dark:text-white">
                  {leadersData.chairman.name}
                </h3>
                <p className="text-lg leading-lh-text19 text-white dark:text-white">
                  {leadersData.chairman.position}
                </p>
              </motion.div>
            </div>
          </motion.div>
          <div className="pb-0 lg:pb-6">
            <motion.h2
              variants={moveUp()}
              viewport={{ once: true }}
              initial="hidden"
              whileInView="show"
              className="text-2xl lg:text-6xl leading-lh-title text-black dark:text-white mb-2 md:mb-5 xl:mb-[34px] lg:max-w-[16ch]"
            >
              {leadersData.chairman.title}
            </motion.h2>
            <div className="lg:max-w-[62ch]">
              {leadersData.chairman.desc.map((item, index) => (
                <motion.p
                  variants={moveUp(index * 0.2)}
                  viewport={{ once: true }}
                  initial="hidden"
                  whileInView="show"
                  key={index}
                  className="mb-3 last:mb-0 lg:last:mb-[17px] lg:mb-[17px] text-lg leading-lh-text19 text-foreground dark:text-white font-light"
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
