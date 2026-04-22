"use client";

import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper/types";
import gsap from "gsap"; // 👈 GSAP import
import "swiper/css";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { LegacySection } from "./type";
import { moveUp } from "../motionVarients";

const LegacyTimelineSlider = ({ data }: { data: LegacySection }) => {
  if (!data.items?.length) return null;

  const [activeSlide, setActiveSlide] = useState(0);
  const mainSwiperRef = useRef<SwiperType>(null);
  const yearSwiperRef = useRef<SwiperType>(null);
  const [navLocked, setNavLocked] = useState(false);

  const handleMainSlideChange = (swiper: SwiperType) => {
    const realIndex = swiper.realIndex % data.items.length;
    setActiveSlide(realIndex);
    if (yearSwiperRef.current) {
      yearSwiperRef.current.slideTo(realIndex, 300);
    }

    // 🔥 Animate active slide text
    const activeEl = swiper.slides[swiper.activeIndex];
    const year = activeEl.querySelector(".history-year");
    const title = activeEl.querySelector(".history-title");
    const desc = activeEl.querySelector(".history-desc");

    gsap.set([year, title, desc], { opacity: 0, y: 50 });
    gsap.to(year, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 0.1,
      ease: "power3.out",
    });
    gsap.to(title, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 0.3,
      ease: "power3.out",
    });
    gsap.to(desc, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 0.5,
      ease: "power3.out",
    });
  };

  // Run animation on first render
  useEffect(() => {
    if (mainSwiperRef.current) {
      handleMainSlideChange(mainSwiperRef.current);
    }
  }, []);

  const handleNavigation = (direction: "next" | "prev") => {
    if (navLocked) return;
    setNavLocked(true);

    if (mainSwiperRef.current) {
      if (direction === "next") {
        mainSwiperRef.current.slideNext();
      } else {
        mainSwiperRef.current.slidePrev();
      }
    }

    setTimeout(() => setNavLocked(false), 600);
  };

  const handleYearClick = (index: number) => {
    if (mainSwiperRef.current) {
      mainSwiperRef.current.slideToLoop(index);
    }
  };

  return (
    <section className={`relative w-full bg-black overflow-hidden`}>
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="bg-black overflow-hidden">
          <div className="container relative h-full">
            {/* Header */}
            <div className="pt-37px lg:pt-47px xl:pt-20 h-full lg:pb-0 flex items-start flex-wrap gap-y-3 md:gap-y-5">
              <motion.h2
               variants={moveUp(0.2)}
               initial="hidden"
               whileInView="show"
               viewport={{ once: true }}
               className="text-4xl xl:text-5xl leading-[1] font-light text-white pb-4 tracking-wide ">
                {data.title}
              </motion.h2>
              {/* Timeline Years Navigation Slider */}
              <div className="lg:ml-auto md:mb-0 lg:top-12 xl:top-19 right-3 md:right-0 flex items-center z-10 lg:h-full order-3 lg:order-2">
                <div className="max-w-[300px] sm:max-w-[400px] md:max-w-[700] lg:max-w-[400px] xl:max-w-[500px]  overflow-hidden h-full relative ">
                  <Swiper
                    onSwiper={(swiper) => {
                      yearSwiperRef.current = swiper;
                    }}
                    modules={[Autoplay]}
                    
                    allowTouchMove={true}
                    grabCursor={true}
                    slideToClickedSlide={false}
                    preventClicks={true}
                    preventClicksPropagation={true}
                    centeredSlides={false}
                    loop={false}
                    speed={500}
                    className="year-navigation-slider h-full "
                    breakpoints={{
                      1024: { slidesPerView: 4, spaceBetween: 10 },
                      992: { slidesPerView: 6, spaceBetween: 10 },
                      768: { slidesPerView: 6, spaceBetween: 22 },
                      400: { slidesPerView: 4, spaceBetween: 15 },
                      0: { slidesPerView: 4, spaceBetween: 10 },

                    }}
                  >
                    {data.items.map((item, index) => (
                      <SwiperSlide
                        key={`year-${item.year}-${index}`}
                        className=" "
                      >
                        <button
                          onClick={() => handleYearClick(index)}
                          className={`cursor-pointer font-normal  duration-500 text-lg leading-[32px] xl:pb-5 hover:text-white whitespace-nowrap ${activeSlide === index
                            ? "text-white font-semibold  md:text-2xl "
                            : "text-gray-400 hover:text-gray-200   "
                            }`}
                        >
                          {item.year}
                        </button>
                        <div className="!w-[60px] md:!w-[85px] h-full !flex ml-5 xl:ml-0 xl:items-center flex-col justify-center">
                          <div
                            className={`w-[2px] h-8 md:h-10 lg:h-14 xl:h-14 bg-accent ${activeSlide === index
                              ? "opacity-100"
                              : "opacity-0"
                              }`}
                          ></div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

              </div>
              <div className="flex items-center space-x-[1px] order-2 xl:order-3 ml-auto lg:ml-0">
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
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#716c6c]"></div>
        {/* History Slider */}
        <div className="flex-1 flex items-center relative z-50 py-37px md:py-[95px] lg:py-[128px] 2xl:py-[144px]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black from-0% to-black/0 to-100% z-0"></div>

          {/* Background Image */}
          <div className="absolute inset-0 z-[-1]">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={`${activeSlide}-${data.items[activeSlide].year}`}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={data.items[activeSlide].image}
                  alt={data.items[activeSlide].imageAlt}
                  width={1920}
                  height={1080}
                  className="object-cover object-right w-full h-full"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <Swiper
            onSwiper={(swiper) => {
              mainSwiperRef.current = swiper;
            }}
            modules={[EffectFade, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            allowTouchMove={true}
            grabCursor={true}
            slideToClickedSlide={false}
            preventClicks={true}
            preventClicksPropagation={true}
            autoplay={{
              delay: 5000,
            }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop={true}
            speed={50}
            onSlideChange={handleMainSlideChange}
            className="w-full h-full history-slider relative z-50"
          >
            {data.items.map((item, index) => (
              <SwiperSlide key={index} className="history-slide">
                <div className="w-full">
                  <div className="container relative z-10">
                    {/* Year */}
                    <div className="history-year text-5xl text-white mb-3 opacity-0">
                      {item.year}
                    </div>

                    {/* Title */}
                    <h2 className="history-title text-xl font-medium text-white mb-3 leading-tight opacity-0">
                      {item.subTitle}
                    </h2>

                    {/* Description */}
                    <p className="history-desc text-lg text-gray-200 leading-relaxed max-w-2xl font-light opacity-0">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default LegacyTimelineSlider;
