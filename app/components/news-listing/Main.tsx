"use client";
import { motion } from "framer-motion";
import BtnPrimary from "../common/BtnPrimary";
import Image from "next/image";
import { moveRight, moveUp } from "../motionVarients";
import { NewsData } from "./type";
import Link from "next/link";
const Main = ({
  title,
  items,
}: {
  title: string;
  items: NewsData["categories"][number]["news"];
}) => {
  return (
    <section className="pt-37px md:pt-47px xl:pt-57px pb-10 xl:pb-57px  bg-light-white dark:bg-black relative overflow-hidden">
      {/* <div className="reveal-overlay absolute inset-0 bg-black z-20"></div> */}
      <div className="container">
        <div className="flex justify-between items-center pb-4 md:pb-4 xl:pb-[47px]">
          <motion.h2
            variants={moveUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className=" text-4xl 2xl:text-5xl font-normal leading-[1.147058823529412] text-black dark:text-white"
          >
            {title}
          </motion.h2>
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {/* <BtnPrimary link={link} text="View All" bgtrans={true} /> */}
          </motion.div>
        </div>
        <div>
          <div className="w-full home-news-swiper xl:!pb-15">
            {items.map((item, index) => (
              <div key={index}>
                <div className="flex flex-wrap xl:flex-nowrap items-center xl:items-stretch gap-4 xl:gap-[69px]">
                  <motion.div
                    variants={moveRight(0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="w-full xl:w-1/2 overflow-hidden"
                  >
                    <Link href={`news/${item.slug}`}>
                      <Image
                        src={item.thumbnail}
                        alt="newsBlockImage"
                        width={2000}
                        height={2000}
                        className="w-full h-full object-cover hover:scale-110 transition-all duration-400"
                      />
                    </Link>
                  </motion.div>
                  <div className="xl:w-1/2 group xl:py-3">
                    {/* <motion.div variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex items-center justify-between mb-4 xl:mb-[47px]" >
                      <button className="bg-accent px-5 py-2 transition-all duration-300 uppercase ">
                        <span className="text-para-color group-hover:text-white transition-all duration-300">
                          {item.category}
                        </span>
                      </button>
                      <p className="text-base font-light text-forground underline underline-offset-10 dark:text-white hover:text-black dark:hover:text-white transition-colors duration-300">
                        {item.date
                          ? new Date(item.date)
                            .toLocaleDateString("en-GB")
                            .replace(/\//g, "-")
                          : new Date(item.createdAt)
                            .toLocaleDateString("en-GB")
                            .replace(/\//g, "-")}
                      </p>
                    </motion.div> */}
                    <motion.h3
                      variants={moveUp(0.2)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="text-xl md:text-2xl font-normal leading-[1.2] xl:leading-[1.40625] text-para-color mb-3 xl:mb-[22px] dark:text-white hover:text-primary transition-colors duration-300 max-w-[55ch] tracking-[-1px]"
                    >
                      <Link href={`news/${item.slug}`} >
                        {item.title}
                      </Link>
                    </motion.h3>
                    <motion.p
                      variants={moveUp(0.4)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="text-lg leading-[1.526315789473684] font-light text-para-color dark:text-white/80 hover:text-black dark:hover:text-white transition-colors duration-300 max-w-[55ch]"
                    >
                      {item.description}
                    </motion.p>
                    <motion.div
                      variants={moveUp(0.6)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="mt-4 xl:mt-[53px]"
                    >
                      <BtnPrimary
                        link={`news/${item.slug}`}
                        text="Read More"
                        bgtrans={true}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
