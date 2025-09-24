"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";

type Props = {
  title: string;
  description: string;
  matters: { title: string; icon: string; content: string }[];
};

const WhyQhse = ({ title, description, matters }: Props) => {
  return (
    <section className="py-57px bg-light-white dark:bg-light-dark">
      <div className="container">
        <motion.h2
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-6xl leading-[1.147058823529412] text-black dark:text-white mb-27px"
        >
          {title}
        </motion.h2>
        <motion.p
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-lg leading-[1.5625] text-black dark:text-white/70 max-w-[80ch]"
        >
          {description}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-[79px] mt-47px">
          {matters.map((item, index) => (
            <motion.div
              variants={moveUp(index * 0.24)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              key={index}
              className="group grid gap-27px grid-rows-[auto_1fr]"
            >
              <div className="border-b border-smgray group-hover:border-b-primary group-hover:border-b-[2px] pb-27px transition-colors duration-300">
                <div className="flex items-center gap-[17px]">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="w-15 h-15 transition duration-300 filter brightness-0 dark:brightness-100 group-hover:brightness-100"
                  />

                  <h3 className="text-2xl leading-lh-text32 text-black dark:text-white group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
              </div>
              <p className="text-lg leading-lh-text19 font-light text-black dark:text-white/70">
                {item.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyQhse;
