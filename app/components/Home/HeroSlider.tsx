"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import BtnPrimary from "../common/BtnPrimary";
import Counter from "../common/Counter";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import { BannerItem, NumberItem } from "./type";
import { parseCounterValue } from "@/lib/parseCounterValue";
import Image from "next/image";

interface HeroSliderProps {
  data: BannerItem[];
  counterData: NumberItem[];
}

const HeroSlider = ({ data, counterData }: HeroSliderProps) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // This triggers Framer Motion animation on each slide change
    setAnimationKey((prev) => prev + 1);
  }, [activeIndex]);

  return (
    <section className="relative  overflow-hidden ">
      {/* <div className="relative w-full overflow-hidden h-full"> */}
      <div className="relative w-full h-full slideroverlay bg-cover bg-center" style={{ backgroundImage: `url(${data[activeIndex]?.image})`, }} >
        <div className="slidermns h-full  container relative pt-10 md:pt-[130px] z-[9]">
          <Swiper
            modules={[Autoplay, EffectFade]}
            autoplay={{ delay: 4000 }}
            loop
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={1000}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full h-full "
          >
            {data.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="  w-full h-full  ">
                  
                  <motion.div key={animationKey} initial="hidden" animate="show" variants={moveUp(0)} >
                    <motion.h2 variants={moveUp(0.5)} initial="hidden" animate="show" className="text-white text-6xl font-normal max-w-[20ch] leading-[1.180555555555556] " >
                      {slide.title}
                    </motion.h2>
                    <motion.p variants={moveUp(1.25)} initial="hidden" animate="show" className="text-white text-lg lg:text-xl font-light max-w-[73ch] leading-[1.521739130434783] pt-[35px] pb-[35px]" >
                      {slide.description}
                    </motion.p>
                    <motion.div variants={moveUp(1.8)} initial="hidden" animate="show" >
                      <BtnPrimary link="/about-us" text="Readmore" bgtrans={true} borderwight={true} className="gap-4" />
                    </motion.div>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom Pagination */}
          <div className="md:absolute top-10 md:top-20 z-20 w-full">
            <div className="container">
              <div className="flex gap-3 md:gap-5   md:flex-col  md:border-r border-[#FFFFFF80] relative right-1 justify-end" style={{ alignItems: "flex-end" }} >
                {data.map((_, index: number) => (
                  <div key={index} className="lead">
                    {data.length > 1 ? (
                      <button
                        className={`mt-8 md:mt-0 text-[14px] leading-[1.8] font-light  relative md:right-[-4px] cursor-pointer px-3 md:px-0 md:pe-[13px]  transition-all duration-300 ${
                          activeIndex === index
                            ? "border-b-[3px] md:border-b-0 md:border-r-[3px] border-accent md:py-3 md:mb-20 text-accent md:text-white"
                            : "md:border-r-[3px] border-[transparent] text-white"
                        }`}
                        onClick={() => swiperRef.current?.slideToLoop(index)}
                      >
                        {" "}
                        0{index + 1}{" "}
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 pt-8 xl:pt-[85px] relative z-10">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0 }} >
              <div className="text-white border border-[#C2C2C2] border-b-0 transition-all duration-300 group active:bg-primary hover:bg-primary xl:hover:translate-y-2 h-full">
                <div className="pe-3 ps-3 xl:ps-10 py-5 xl:py-[32px]">
                  <div className="min-h-12 xl:min-h-20 3xl:min-h-22">
                    <p className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-normal leading-[0.7352941176470588] mb-4 lg:mb-6 transition-transform duration-500  ease-in-out group-hover:translate-y-1">
                      {parseCounterValue(counterData[0].number).prefix}
                      <Counter
                        from={0}
                        to={parseCounterValue(counterData[0].number).number}
                        duration={2}
                      />
                      {parseCounterValue(counterData[0].number).suffix}
                    </p>
                  </div>
                  <p className="uppercase font-light text-base xl:text-lg leading-[1]">Years of Expertise</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="-ml-px">
              <div className="text-white border border-[#C2C2C2] border-b-0 pe-3 transition-all duration-300 group active:bg-primary hover:bg-primary xl:hover:translate-y-2 h-full">
                <div className="ps-3 xl:ps-10 py-5 xl:py-[32px]">
                
                  <div className="min-h-12 xl:min-h-20 3xl:min-h-22">
                    <p className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-normal leading-[0.7352941176470588] mb-4 lg:mb-6 transition-transform duration-500  ease-in-out group-hover:translate-y-1">
                      <span className="leading-[0] inline-block align-middle">
                        <Image src="/assets/img/icons/aed.svg" alt="Dirham" width={60} height={60}
                          className="w-6 h-6 md:w-10 md:h-10 2xl:w-11 2xl:h-11 3xl:w-12 3xl:h-12 inline-block me-1 mb-[1px]" />
                      </span>
                      {parseCounterValue(counterData[1].number).prefix}
                      <Counter from={0} to={parseCounterValue(counterData[1].number).number} duration={2} />
                      {parseCounterValue(counterData[1].number).suffix}
                    </p>
                  </div>
                  <p className="uppercase font-light text-base xl:text-lg leading-[1]">
                    {" "}
                    Portfolio Value{" "}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="-mt-px lg:-mt-0 lg:-ml-px">
              <div className="text-white border border-[#C2C2C2] border-b-0 pe-3 transition-all duration-300 group active:bg-primary hover:bg-primary h-full xl:hover:translate-y-2">
                <div className="ps-3 xl:ps-10 py-5 xl:py-[32px]">
                  <div className="min-h-12 xl:min-h-20 3xl:min-h-22">
                    <p className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-normal leading-[0.7352941176470588] mb-4 lg:mb-6 transition-transform duration-500  ease-in-out group-hover:translate-y-1">
                      {parseCounterValue(counterData[2].number).prefix}
                      <Counter
                        from={0}
                        to={parseCounterValue(counterData[2].number).number}
                        duration={2}
                      />
                      {parseCounterValue(counterData[2].number).suffix}
                    </p>
                 </div>
                  <p className="uppercase font-light text-base xl:text-lg leading-[1]">
                    Projects Completed
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 }} className="relative z-[3] -ml-px -mt-px lg:-mt-0">
              <div className="text-white border border-[#C2C2C2] border-b-0 pe-3 transition-all duration-300 group active:bg-primary hover:bg-primary h-full xl:hover:translate-y-2">
                <div className="ps-3 xl:ps-10 py-5 xl:py-[32px]">
                  <div className="min-h-12 xl:min-h-20 3xl:min-h-22">
                    <p className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-normal leading-[0.7352941176470588] mb-4 lg:mb-6 transition-transform duration-500  ease-in-out group-hover:translate-y-1">
                      {parseCounterValue(counterData[3].number).prefix}
                      <Counter
                        from={0}
                        to={parseCounterValue(counterData[3].number).number}
                        duration={2}
                      />
                      {parseCounterValue(counterData[3].number).suffix}
                    </p>
                  </div>
                  <p className="uppercase font-light text-base xl:text-lg  leading-[1]"> Dedicated Manpower </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default HeroSlider;
