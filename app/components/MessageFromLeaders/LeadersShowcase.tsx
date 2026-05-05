"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { moveUp } from "../motionVarients";
import { MessageProps } from "./type";

const LeadersShowcase = ({
  data,
}: {
  data: MessageProps["data"]["firstSection"];
}) => {

const FALLBACK_IMAGE = "/assets/img/avatar.png";
  return (
    <section className="pt-6 lg:pt-15 xl:pt-25px dark:pb-1 dark:bg-black ">
      <div className="container">
        <motion.h2
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl 2xl:text-5xl leading-[1.205882352941176] text-black dark:text-white mb-4 md:mb-57px"
        >
          {data.title}
        </motion.h2>
        <div className="flex md:justify-center md:items-center flex-col">
          <div className="grid grid-cols-1  mb-5 md:mb-12 xl:mb-[32px]">
            <motion.div
              variants={moveUp(0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="group flex flex-col"
            >
              <div
                className={`${0 % 2 === 0 ? "bg-[#ebebeb]" : "bg-[#dfdfdf]"} group-hover:bg-gray-100 transition-all duration-300 h-[280px] xl:h-[404px] w-full xl:w-[385px] flex flex-col mb-5 xl:mb-[10px] overflow-hidden relative`}
              >
                <Image
                  src={data.items[0].image || FALLBACK_IMAGE}
                  alt={data.items[0].imageAlt || ""}
                  fill
                  className="object-contain object-bottom group-hover:scale-105 transition-all duration-300"
                />
              </div>{" "}
              <div>
                <h3 className="text-xl md:text-2xl leading-[1.2] text-black dark:text-white xl:mb-2 text-center">
                  {data.items[0].name}
                </h3>
                <p className="text-lg leading-lh-text19 text-para-color dark:text-white/70 font-light text-center">
                  {data.items[0].designation}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2  gap-y-6 md:gap-y-6 xl:gap-y-0 md:gap-x-[60px] xl:gap-x-[100px] mb-5 md:mb-12 xl:mb-[57px]">
            {data.items.slice(1).map((item, index) => (
              <motion.div
                variants={moveUp(0.5)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="group"
                key={index}
              >
                <div
                  className={`${
                    0 % 2 === 0 ? "bg-[#ebebeb]" : "bg-[#dfdfdf]"
                  } group-hover:bg-gray-100 transition-all duration-300 h-[280px] xl:h-[308px] w-full xl:w-[288px] flex flex-col mb-5 xl:mb-[10px] overflow-hidden relative`}
                >
                  <Image
                    src={item.image || FALLBACK_IMAGE}
                    alt={item.imageAlt || ""}
                    fill
                    className="object-contain object-bottom group-hover:scale-105 transition-all duration-300"
                  />
                </div>{" "}
                <div>
                  <h3 className="text-xl md:text-2xl text-center leading-[1.2] text-black dark:text-white xl:mb-2">
                    {item.name}
                  </h3>
                  <p className="text-lg leading-lh-text19 text-center text-para-color dark:text-white/70 font-light">
                    {item.designation}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadersShowcase;
