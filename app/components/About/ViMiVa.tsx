"use client";

import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import Image from "next/image";
import { useState } from "react";
import parse from "html-react-parser";
import { ViMiVaProps } from "./type";

const ViMiVa = ({ data }: ViMiVaProps) => {
  const [activeReadMore, setActiveReadMore] = useState<string | null>(null);

  const toggleReadMore = (id: string) => {
    setActiveReadMore((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-57px dark:bg-black">
      <div className="container">
        {/* <div className="border-b dark:border-white/20  pb-8 xl:pb-57px"> */}
        <div className="pb-8 xl:pb-57px">
          <motion.h2
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className=" text-4xl xl:text-5xl leading-lh-title text-black dark:text-white mb-3 xl:mb-[17px] letterSp-2"
          >
            {data.mainTitle}
          </motion.h2>
          <motion.h3
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-xl xl:text-2xl lg:text-2xl leading-[1.2] xl:leading-[1.5625] dark:text-white text-para-color"
          >
            {data.subTitle}
          </motion.h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:mt-5 gap-y-6 md:gap-y-10">
          {data.items.map((item, index) => (
            <motion.div
              variants={moveUp(index * 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              key={index}
              className="bg-white dark:bg-black flex flex-col md:gap-5 md:border-r dark:border-white/20 md:last:border-r-0 xl:pl-8 xl:pr-8 last:pr-0 border-b last:border-b-0 last:pb-0 dark:border-white/20 pb-5 md:pb-8 xl:pb-0 px-0 md:px-5 xl:px-0 md:border-b-0"
            >
              <div>
                <Image src={item.logo} alt={item.logoAlt} width={50} height={50} className="w-auto h-10 xl:h-13 mb-4 md:mb-0" />
              </div>
              <h3 className="text-2xl leading-lh-title dark:text-white text-para-color mb-3 md:mb-0">
                {item.title}
              </h3>

              <div className="text-base xl:text-lg leading-[1.5] dark:text-white text-para-color flex flex-col vision-mission-section">
                {item.description.split(" ").length > 30 &&
                  activeReadMore !== item._id
                  ? parse(
                    item.description.split(" ").slice(0, 30).join(" ") + "..."
                  )
                  : parse(item.description)}

                {item.description.split(" ").length > 30 && (
                  <span
                    className="dark:text-white cursor-pointer text-base text-primary"
                    onClick={() => toggleReadMore(item._id)}
                  >
                    {activeReadMore === item._id ? " Read Less" : " Read More"}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ViMiVa;
