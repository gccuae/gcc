"use client";

import { aboutData } from "./data";
import { Accordion } from "./Accordion";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";

const VMV = () => {
  const vmvItems = Object.values(aboutData.vmv).map((item) => ({
    title: item.title,
    content: item.desc,
    icon: item.icon,
  }));
  return (
    <section className="pt-57px xl:py-57px dark:bg-black">
      <div className="container">
        <div className="border-b border-smgray  pb-8 xl:pb-57px">
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
        <div>
          <Accordion items={vmvItems} />
        </div>
      </div>
    </section>
  );
};

export default VMV;
