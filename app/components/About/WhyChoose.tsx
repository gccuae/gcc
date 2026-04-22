"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import { WhyChooseProps } from "./type";

const WhyChoose = ({ data }: WhyChooseProps) => {
  return (
    <section className={`pt-37px pb-57px xl:py-57px bg-light-white dark:bg-black overflow-hidden ${data.hidden ? "hidden" : ""}`}>
      <div className="container">
        <motion.h2
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className=" text-4xl 2xl:text-5xl leading-[1.147058823529412] text-black dark:text-white mb-2 xl:mb-3  tracking-[-1.9px]"
        >
          {data.mainTitle}
        </motion.h2>
        <motion.p
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-lg xl:text-xl 2xl:text-2xl max-w-[96ch] leading-[1.526315789473684] text-para-color dark:text-white/70"
        >
          {data.subTitle}
        </motion.p>
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.4, // Controls delay between cards
                delayChildren: 0.2, // Small delay before first starts
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-5 md:mt-8 lg:mt-[35px] gap-5 xl:gap-0"
        >
          {data.items.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { x: 150, opacity: 0 },
                show: {
                  x: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.9, // slower slide
                    ease: "easeOut",
                  },
                },
              }}
              className="flex flex-col border xl:border-r-0 xl:last:border-r dark:border-white/20 dark:border-[#434343] group"
            >
              <div className="border-b dark:border-white/20 dark:border-[#434343] xl:pt-5 2xl:pr-1 p-5 pb-2 2xl:pb-0 2xl:p-8 xl:pb-0 group-hover:border-b-primary group-hover:border-b-[4px] transition-all duration-300">
                {/* ICON POP-IN */}
                <motion.div
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    show: {
                      scale: 1,
                      opacity: 1,
                      transition: {
                        duration: 0.4,
                        delay: 0.1, // happens right after card appears
                        ease: "backOut",
                      },
                    },
                  }}
                  className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full flex items-center justify-center mb-3 lg:mb-4 transition-all duration-300"
                >
                  <Image
                    src={item.logo}
                    alt={item.logoAlt}
                    width={100}
                    height={100}
                    className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] transition-all duration-300"
                  />
                </motion.div>

                <h3 className="text-xl max-w-[16ch] 2xl:text-2xl leading-[1.3155] dark:text-white pb-3 xl:pb-[27px] text-black">
                  {item.title}
                </h3>
              </div>

              <div className="p-4 xl:p-5 2xl:p-8 2xl:pt-[27px]">
                <p className="text-lg leading-[1.5625] dark:text-white text-para-color font-light">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;
