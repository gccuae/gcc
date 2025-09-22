"use client";

import { projectDetailsData } from "./data";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { moveLeft, moveUp } from "../motionVarients";

const DetailsTab = () => {
  const { projectDetails } = projectDetailsData;
  const [activeTab, setActiveTab] = useState(0);
  return (
    <section className="py-57px bg-light-white dark:bg-[#0d0d0d]">
      <div className="container">
        <div className="">
          {/* Tab buttons */}
          <motion.div
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative border-y border-gray-200 flex flex-col md:flex-row flex-wrap space-x-8 items-baseline"
          >
            {projectDetails.map((tab, idx) => (
              <motion.button
                variants={moveLeft(idx * 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                key={tab.title}
                onClick={() => setActiveTab(idx)}
                className={`py-2 md:py-4 xl:py-[27px] text-xl leading-normal font-medium relative ${
                  activeTab === idx
                    ? "text-black dark:text-white"
                    : "text-gray-500 hover:text-black dark:hover:text-white/70"
                }`}
              >
                {tab.title}
                {activeTab === idx && (
                  <motion.div
                    layoutId="underline"
                    className="absolute top-[-2px] left-0 right-0 h-[4px] bg-green-600"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Tab content */}
          <motion.div
            key={activeTab}
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-[70px] xl:grid-cols-[934px_auto] items-start"
          >
            {/* Text */}
            <div className="space-y-4">
              {projectDetails[activeTab].description.map((para, i) => (
                <motion.p
                  variants={moveUp(i * 0.2)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  key={i}
                  className="text-21 leading-[1.380952380952381] text-foreground dark:text-white/70"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Image */}
            <motion.div
              variants={moveLeft()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative w-full h-64 md:h-96"
            >
              <Image
                src={projectDetails[activeTab].image}
                alt={projectDetails[activeTab].title}
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DetailsTab;
