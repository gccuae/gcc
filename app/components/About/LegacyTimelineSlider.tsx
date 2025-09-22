"use client";

import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper/types";
import { motion } from "framer-motion";
import { fadeIn, moveUp, moveLeft } from "../motionVarients";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { StaticImageData } from "next/image";

interface TimelineItem {
  year: number;
  title: string;
  description: string;
  backgroundImage: string | StaticImageData;
}

const LegacyTimelineSlider = ({
  data,
  title,
}: {
  data: TimelineItem[];
  title: string;
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const mainSwiperRef = useRef<SwiperType>(null);
  const yearSwiperRef = useRef<SwiperType>(null);

  const handleYearClick = (index: number) => {
    setActiveSlide(index);
    if (mainSwiperRef.current) {
      mainSwiperRef.current.slideToLoop(index);
    }
  };

  const handleMainSlideChange = (swiper: SwiperType) => {
    const realIndex = swiper.realIndex;
    setActiveSlide(realIndex);
    if (yearSwiperRef.current) {
      yearSwiperRef.current.slideToLoop(realIndex);
    }
  };

  // const handleNavigation = (direction: 'next' | 'prev') => {
  //   if (mainSwiperRef.current) {
  //     if (direction === 'next') {
  //       mainSwiperRef.current.slideNext();
  //     } else {
  //       mainSwiperRef.current.slidePrev();
  //     }
  //   }
  //   if (yearSwiperRef.current) {
  //     if (direction === 'next') {
  //       yearSwiperRef.current.slideNext();
  //     } else {
  //       yearSwiperRef.current.slidePrev();
  //     }
  //   }
  // };
  const [navLocked, setNavLocked] = useState(false);

  const handleNavigation = (direction: "next" | "prev") => {
    if (navLocked) return; // ignore if still cooling down
    setNavLocked(true);

    if (mainSwiperRef.current) {
      if (direction === "next") {
        mainSwiperRef.current.slideNext();
      } else {
        mainSwiperRef.current.slidePrev();
      }
    }

    if (yearSwiperRef.current) {
      if (direction === "next") {
        yearSwiperRef.current.slideNext();
      } else {
        yearSwiperRef.current.slidePrev();
      }
    }

    setTimeout(() => setNavLocked(false), 600);
  };

  return (
    <div className="relative w-full  bg-black overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <motion.div
          variants={fadeIn(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out"
        >
          <Image
            src={data[activeSlide].backgroundImage}
            alt=""
            width={1920}
            height={1280}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col ">
        <div className="bg-black   overflow-hidden">
          <div className="container relative h-full">
            {/* Header */}
            <div className="pt-10 xl:pt-20 h-full pb-12 lg:pb-0">
              <motion.h2
                variants={moveUp()}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-5xl leading-lh-title font-light text-white mb-4 md:mb-8 xl:mb-10 tracking-wide"
              >
                {title}
              </motion.h2>
            </div>

            {/* Timeline Years Navigation Slider */}
            <motion.div
              variants={moveLeft()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="absolute bottom-0 lg:bottom-auto mb-2 md:mb-0  lg:top-12 xl:top-19 right-3 md:right-0 flex items-center z-10 lg:h-full"
            >
              {/* Year Slider Container */}
              <div className="overflow-hidden h-full relative right-3 md:right-9 top-1 md:top-0">
                <Swiper
                  onSwiper={(swiper) => {
                    yearSwiperRef.current = swiper;
                  }}
                  modules={[Navigation]}
                  spaceBetween={22}
                  slidesPerView="auto"
                  loop={true}
                  speed={500}
                  allowTouchMove={false}
                  className="year-navigation-slider h-full"
                  breakpoints={{
                    0: { slidesPerView: "auto", spaceBetween: 5 },
                    425: { slidesPerView: "auto", spaceBetween: 22 },
                    768: { slidesPerView: "auto", spaceBetween: 22 },
                  }}
                >
                  {data.map((item, index) => (
                    <SwiperSlide
                      key={`year-${item.year}-${index}`}
                      className="!w-[60px] md:!w-[85px] !flex items-center flex-col justify-center"
                    >
                      <button
                        onClick={() => handleYearClick(index)}
                        className={`font-light transition-all duration-300 hover:text-white whitespace-nowrap ${
                          activeSlide === index
                            ? "text-white font-semibold text-lg md:text-2xl leading-[1] pb-5"
                            : "text-gray-400 hover:text-gray-200 text-lg leading-[1]"
                        }`}
                      >
                        {item.year}
                      </button>
                      <div
                        className={`w-[1px] h-full bg-accent ${
                          activeSlide === index ? "opacity-100" : "opacity-0"
                        }`}
                      ></div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Navigation Arrows - Control Both Sliders */}
              <div className="flex items-center space-x-[1px] absolute -top-2 right-0 z-10">
                <button
                  onClick={() => handleNavigation("prev")}
                  className="cursor-pointer py-2 px-4 rounded-l-2xl bg-white hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 text-accent" />
                </button>
                <button
                  onClick={() => handleNavigation("next")}
                  className="cursor-pointer py-2 px-4 rounded-r-2xl bg-white hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 text-accent" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#716c6c]"></div>
        {/* Swiper Container */}
        <div className="flex-1 flex items-center relative z-50 pb-[40px] py-[30px] md:py-[95px] lg:py-[128px]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black from-0% to-black/0 to-100% z-0"></div>
          <Swiper
            onSwiper={(swiper) => {
              mainSwiperRef.current = swiper;
            }}
            modules={[Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            speed={500}
            onSlideChange={handleMainSlideChange}
            className="w-full h-full history-slider relative z-50"
          >
            {data.map((item) => (
              <SwiperSlide key={item.year} className="history-slide">
                <div className="  w-full">
                  <div className="container relative z-10">
                    {/* Year Display */}
                    <motion.div
                      variants={moveUp()}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="text-5xl text-white mb-3 opacity-90"
                    >
                      {item.year}
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                      variants={moveUp(0.2)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="text-xl  font-medium text-white mb-3 leading-tight"
                    >
                      {item.title}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                      variants={moveUp(0.4)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="text-lg text-gray-200 leading-relaxed max-w-2xl font-light"
                    >
                      {item.description}
                    </motion.p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default LegacyTimelineSlider;
