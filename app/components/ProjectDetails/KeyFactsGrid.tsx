"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../../components/motionVarients";
import { NumberSection } from "./type";

interface KeyFactsGridProps {
  items: NumberSection["items"];
}

const KeyFactsGrid = ({ items }: KeyFactsGridProps) => {
  return (
    <motion.div
      variants={moveUp(0.32)}
      viewport={{ once: true }}
      initial="hidden"
      whileInView="show"
      className="grid grid-cols-2 gap-x-5 md:gap-x-10 xl:gap-x-14 2xl:gap-x-18 lg:grid-cols-4"
    >
      {items?.map((item, index) => (
        <motion.div
          key={index}
          variants={moveUp(index * 0.22)}
          viewport={{ once: true }}
          initial="hidden"
          whileInView="show"
          className="relative border-r border-transparent dark:border-[#3f3f3f] dark:border-white/20 pt-4 xl:pt-[22px] pb-4 xl:pb-[21px] group after:absolute after:top-4 after:bottom-4 after:-right-[10px] after:w-px after:bg-[#C2C2C2] dark:after:bg-white/20 after:content-[''] md:after:-right-[20px] xl:after:-right-[28px] 2xl:after:-right-[36px] [&:nth-child(2n)]:after:hidden lg:[&:nth-child(2n)]:after:block lg:[&:nth-child(4n)]:after:hidden last:after:hidden"
        >
          {/* <div
            className={`flex ${index % 2 === 1 ? "justify-center" : "justify-start"} ${
              index % 4 === 0 ? "lg:justify-start" : "lg:justify-center"
            }`}
          > */}
          <div
            className={`flex justify-left"
            }`}
          >
            <div className="flex w-full max-w-[170px] flex-col items-start text-left transition-all duration-500 ease-out group-hover:-translate-y-0.5 lg:w-auto lg:max-w-none">
              <div className="mb-3 md:mb-5 xl:mb-6 flex h-10 items-center justify-start xl:h-[62px] xl:w-[62px] 2xl:w-auto 2xl:h-[62px]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  width={100}
                  height={100}
                  className="w-10 h-auto xl:w-[62px]  transition-all duration-500 ease-out group-hover:brightness-0"
                />
              </div>
              <h3 className="text-xl sm:text-2xl xl:text-3xl leading-lh-text68 font-normal mb-3 md:mb-4 xl:mb-2 text-black dark:text-white transition-colors duration-500 ease-out group-hover:text-primary">
                {item.number}
              </h3>
              <p className="text-sm md:text-lg leading-lh-text19 text-black/70 dark:text-white/72 transition-colors duration-500 ease-out group-hover:text-black dark:group-hover:text-white">
                {item.value}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default KeyFactsGrid;
