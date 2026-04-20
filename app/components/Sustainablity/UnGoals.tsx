"use client";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import { useState } from "react";
import { SustainabilityType } from "./type";

const SectorSlider = ({
  data,
}: {
  data: SustainabilityType["forthSection"];
}) => {
  const [pressedNav, setPressedNav] = useState<'prev' | 'next' | null>(null);
  return (
    <section className="wrapper pt-57px pb-10 md:pb-15 xl::py-57px  bg-light-white dark:bg-light-dark text-white overflow-hidden">
      <div className="container">
        <motion.h2
          variants={moveUp(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className=" text-4xl xl:text-5xl font-normal leading-[1.147058823529412] pb-4 xl:pb-27px text-black dark:text-white"
        >
          {data.title}
        </motion.h2>
        <motion.p
          variants={moveUp(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-lg font-light leading-[1.391304347826087] pb-6 xl:pb-47px text-para-color dark:text-white max-w-[80ch]"
        >
          {data.description}
        </motion.p>
        <div>
          <div className="relative">
            <div className="absolute top-10 lg:top-2/4 lg:right-[-10px] xl:top-4/6 xl:-right-12 z-10 w-full xl:w-[94px] xl:h-[94px] rounded-full flex items-center justify-end xl:justify-center gap-2 sm:gap-3 md:gap-4 xl:gap-0 xl:bg-black xl:overflow-hidden">
              {/* Custom Navigation Buttons */}
              <button
                onClick={() => { setPressedNav('prev'); setTimeout(() => setPressedNav(null), 1800); }}
                className={`un-goals-prev group flex items-center justify-center h-10 w-10 md:h-14 md:w-14 xl:w-1/2 xl:h-full cursor-pointer transition-all duration-300 rounded-full xl:rounded-none xl:border-r xl:border-transparent
                  ${ pressedNav === 'prev' ? 'bg-primary text-white' : 'bg-black text-[#7AC142] hover:bg-primary hover:text-white' }`}
                aria-label="Previous slide"
              >
                <svg width="15" height="26" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg"
                  className="w-2 md:w-3 xl:w-[35%] h-full md:h-auto transition-transform duration-300 xl:translate-x-[8px] xl:group-hover:translate-x-0">
                  <path d="M14 1L2 13L14 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <button
                onClick={() => { setPressedNav('next'); setTimeout(() => setPressedNav(null), 1800); }}
                className={`un-goals-next group flex items-center justify-center w-10 h-10 md:w-14 md:h-14 xl:w-1/2 xl:h-full cursor-pointer transition-all duration-300 rounded-full xl:rounded-none
                  ${ pressedNav === 'next' ? 'bg-primary text-white' : 'bg-black text-[#7AC142] hover:bg-primary hover:text-white' }`}
                aria-label="Next slide"
              >
                <svg width="15" height="26" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg"
                  className="w-2 md:w-3 xl:w-[35%] h-full md:h-auto transition-transform duration-300 xl:-translate-x-[8px] xl:group-hover:translate-x-0">
                  <path d="M1 1L13 13L1 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <Swiper
              className="sector-slider"
              slidesPerView={2}
              spaceBetween={0}
              loop={true}
              modules={[Pagination, Navigation]}
              pagination={false}
              navigation={{ prevEl: ".un-goals-prev", nextEl: ".un-goals-next" }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                },
                1280: {
                  slidesPerView: 3,
                },
              }}
            >
              {data.items.map((item, index) => {
                const hasDescription = Boolean(item.description?.trim());
                return (
                  <SwiperSlide
                    key={index}
                    className="xl:pr-0 xl:pl-0" // keep layout padding here
                  >
                    {/* Animate border + content inside */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
                      className="h-full border-t-1 lg:border-r-1 dark:border-white/20 relative group md:pl-[15px] md:pr-[15px] xl:pr-0 max-md:mb-5" >
                      <div className="absolute -top-1 left-0 w-full h-[6px] bg-transparent group-hover:bg-primary transition-colors duration-300 z-50"></div>

                      <div className="flex flex-col justify-between max-h-[28em] md:max-h-[35em] 3xl:max-h-[38em] overflow-hidden z-10 relative group">
                        <div className="flex xl:pl-4 xl:pr-3 pt-6 xl:pt-[37px] group-first:pl-0 transition-all duration-300">
                          <div className="flex flex-col items-start">
                            <Image src={item.logo} alt={item.logoAlt} width={100} height={100} className="w-[98px] h-[100px] object-contain mb-[17px] " />
                            <h3 className="text-xl xl:text-2xl 3xl:leading-[1.5625] font-normal transition-all duration-300 text-black dark:text-white">
                              {item.title}
                            </h3>
                          </div>
                        </div>

                        {hasDescription && (
                          <div className="xl:pl-4 xl:pr-3 group-first:pl-0 xl:grid xl:grid-rows-[0fr] xl:opacity-0 group-hover:xl:grid-rows-[1fr] group-hover:xl:opacity-100 transition-[grid-template-rows,opacity] ease-in-out duration-500">
                            <div className="overflow-hidden">
                              <p className="text-base 3xl:text-lg pt-2 font-[300] leading-[1.5] 3xl:leading-[1.526315789473684] sector-description relative z-10 text-para-color dark:text-white">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="mt-auto overflow-hidden group-first:pl-0 relative z-10 3xl:pt-27px pt-3 max-h-[300px]  md:max-h-[400px] max-xl:h-[400px] 2xl:max-h-[500px]">
                          <Image src={item.image} alt={item.imageAlt} width={487} height={403}
                            className="w-full h-full object-cover object-bottom flex overflow-hidden pl-0 pr-0 xl:pl-[15px] xl:pr-[15px] group-first:pl-0 xl:min-h-[403px]" />
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectorSlider;

