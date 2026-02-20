"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { moveLeft, moveUp } from "../motionVarients";
import { ThirdSection } from "./type";
import parse from "html-react-parser";

const DetailsTab = ({ data }: { data: ThirdSection }) => {
  const projectDetails = data.items;
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Autoplay interval (5 seconds)
  const AUTOPLAY_INTERVAL = 6000;

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveTab((prev) => (prev + 1) % data.items.length);
      }, AUTOPLAY_INTERVAL);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, projectDetails.length]);

  const handleTabClick = (idx: number) => {
    setActiveTab(idx);
    setIsPaused(true);

    // Resume autoplay after 10 seconds of manual selection
    setTimeout(() => {
      setIsPaused(false);
    }, 10000);
  };

  return (
    <section className="py-57px bg-white">
      <div className="container">
        <div className="">
          {/* Tab buttons */}
          <motion.div
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative border-y border-gray-200 dark:border-[#454545] flex flex-col md:flex-row flex-wrap space-x-8 items-baseline"
          >
            {projectDetails.map((tab, idx) => (
              <motion.button
                variants={moveLeft(idx * 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                key={tab.title}
                onClick={() => handleTabClick(idx)}
                className={`group relative pb-4 pt-2 xl:py-[27px] text-xl leading-normal font-medium transition-colors duration-300 cursor-pointer ${
                  activeTab === idx
                    ? "text-black dark:text-white"
                    : "text-gray-500 dark:text-white/70 hover:text-black dark:hover:text-white"
                }`}
              >
                {tab.title}

                {/* 🟩 Active Tab Green Line */}
                {activeTab === idx && (
                  <motion.div
                    layoutId="underline"
                    className="absolute top-[-2px] left-0 right-0 h-[4px] bg-green-600"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}

                {/* 🟥 Hover Red Line */}
                {activeTab !== idx && (
                  <motion.div className="absolute top-[-2px] left-0 right-0 h-[4px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Tab content */}
          <motion.div
            key={activeTab}
            variants={moveUp()}
            initial="hidden"
            animate="show"
            className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-[70px] xl:grid-cols-[934px_auto] items-stretch"
          >
            {/* Text */}
            <div>
              <motion.div
                variants={moveUp(0.2)}
                initial="hidden"
                animate="show"
                className="text-21 leading-[1.380952380952381] text-[#515151] dark:text-white/70 [&_p]:-mb-[5px] [&_p:last-child]:mb-0 text-justify"
              >
                {parse(projectDetails[activeTab]?.description || "")}
              </motion.div>
            </div>

            {/* Image */}
<motion.div
  variants={moveLeft()}
  initial="hidden"
  animate="show"
  className="relative w-full aspect-[4/3] md:aspect-[16/10] xl:aspect-[934/560] overflow-hidden"
>
  {projectDetails[activeTab]?.image ? (
    <Image
      src={projectDetails[activeTab].image}
      alt={projectDetails[activeTab]?.title || ""}
      fill
      className="object-cover"
    />
  ) : (
    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
      <span className="text-gray-500 text-2xl">350 × 350</span>
    </div>
  )}
</motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DetailsTab;
