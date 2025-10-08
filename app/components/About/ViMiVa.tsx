"use client";

import { aboutData } from "./data";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import Image from "next/image";
const ViMiVa = () => {
  const vmvItems = Object.values(aboutData.vmv).map((item) => ({
    title: item.title,
    content: item.desc,
    icon: item.icon,
  }));
  return (
    <section className="pt-57px xl:py-57px dark:bg-black">
      <div className="container">
        {/* <div className="border-b border-smgray  pb-8 xl:pb-57px"> */}
        <div className="pb-8 xl:pb-57px">
          <motion.h2
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-5xl leading-lh-title text-black dark:text-white mb-[17px]"
          >
            Vision, Mission & Values
          </motion.h2>
          <motion.h3
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-xl xl:text-2xl lg:text-2xl leading-[1.2] xl:leading-[1.5625] dark:text-white"
          >
            Guided by Purpose, Powered by Principles
          </motion.h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
          {vmvItems.map((item, index) => (
            <motion.div
              variants={moveUp(index * 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              key={index}
              className="bg-white dark:bg-black  flex flex-col gap-5 xl:border-r border-smgray xl:last:border-r-0 xl:px-8"
            >
              <div>
                <Image src={item.icon} alt={item.title} width={50} height={50} className="w-auto h-10 xl:h-13" />
              </div>
              <h3 className="text-2xl leading-lh-title text-black dark:text-white ">
                {item.title}
              </h3>
              <p className="text-base leading-[1.5] dark:text-white">
                {item.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ViMiVa;
