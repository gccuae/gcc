"use client";

import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper/types";
import gsap from "gsap"; // 👈 GSAP import
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { LegacySection } from "./type";

const LegacyTimelineSlider = ({ data }: { data: LegacySection }) => {
  const doubledTimelineData = {
    ...data,
    items: [...data.items, ...data.items],
  };

  const [activeSlide, setActiveSlide] = useState(0);
  const mainSwiperRef = useRef<SwiperType>(null);
  const yearSwiperRef = useRef<SwiperType>(null);
  const [navLocked, setNavLocked] = useState(false);

  const handleMainSlideChange = (swiper: SwiperType) => {
    const realIndex = swiper.realIndex;
    setActiveSlide(realIndex);
    if (yearSwiperRef.current) {
      yearSwiperRef.current.slideToLoop(realIndex, 0);
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
    <div className="relative w-full bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={doubledTimelineData.items[activeSlide].year} // unique key per image
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={doubledTimelineData.items[activeSlide].image}
              alt={doubledTimelineData.items[activeSlide].imageAlt}
              fill
              className="object-cover w-full h-full"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="bg-black overflow-hidden">
          <div className="container relative h-full">
            {/* Header */}
            <div className="pt-10 xl:pt-20 h-full  lg:pb-0 flex items-start flex-wrap ">
              <h2 className="text-5xl leading-[1] font-light text-white pb-4 tracking-wide ">
                {data.title}
              </h2>
              {/* Timeline Years Navigation Slider */}
              <div className="xl:ml-auto md:mb-0 lg:top-12 xl:top-19 right-3 md:right-0 flex items-center z-10 lg:h-full order-3 xl:order-2">
                <div className="max-w-[300px] sm:max-w-[400px] md:max-w-[700px] lg:max-w-[500px] overflow-hidden h-full relative ">
                  <Swiper
                    onSwiper={(swiper) => {
                      yearSwiperRef.current = swiper;
                    }}
                    modules={[Navigation, Autoplay]}
                    spaceBetween={22}
                    slidesPerView={5}
                    autoplay={{
                      delay: 5000,
                    }}
                    allowTouchMove={false}
                    slideToClickedSlide={false}
                    preventClicks={true}
                    preventClicksPropagation={true}
                    centeredSlides={false}
                    loop={true}
                    speed={500}
                    className="year-navigation-slider h-full "
                    breakpoints={{
                      0: { slidesPerView: 4, spaceBetween: 5 },
                      400: { slidesPerView: 4, spaceBetween: 22 },
                      768: { slidesPerView: 4, spaceBetween: 22 },
                    }}
                  >
                    {doubledTimelineData.items.map((item, index) => (
                      <SwiperSlide
                        key={`year-${item.year}-${index}`}
                        className=" "
                      >
                        <button
                          // onClick={() => handleYearClick(index)}
                          className={`font-normal  duration-500 text-lg leading-[32px] xl:pb-5 hover:text-white whitespace-nowrap ${
                            activeSlide === index
                              ? "text-white font-semibold  md:text-2xl "
                              : "text-gray-400 hover:text-gray-200   "
                          }`}
                        >
                          {item.year}
                        </button>
                        <div className="!w-[60px] md:!w-[85px] h-full !flex ml-5 xl:ml-0 xl:items-center flex-col justify-center">
                          <div
                            className={`w-[2px] h-8 xl:h-14 bg-accent ${
                              activeSlide === index
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          ></div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Navigation Arrows */}
                {/* <div className="flex items-center space-x-[1px] absolute top-0 lg:-top-1 right-0 z-10"> */}
                {/* <div className="flex items-center space-x-[1px]">
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
              </div> */}
              </div>
              <div className="flex items-center space-x-[1px] order-2 xl:order-3 ml-auto xl:ml-0">
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
        <div className="flex-1 flex items-center relative z-50 pb-[40px] pt-[90px] md:py-[95px] lg:py-[128px]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black from-0% to-black/0 to-100% z-0"></div>
          <Swiper
            onSwiper={(swiper) => {
              mainSwiperRef.current = swiper;
            }}
            modules={[Navigation, EffectFade, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            allowTouchMove={false}
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
            {doubledTimelineData.items.map((item, index) => (
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
    </div>
  );
};

export default LegacyTimelineSlider;
