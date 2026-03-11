"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { moveUp } from "../motionVarients";
import { motion } from "framer-motion";
import { AiTechnologyType } from "./type";

const AiSlider = ({
  data,
}: {
  data: AiTechnologyType["secondSection"]["items"];
}) => {
  const totalSlides = data.length;
  const visibleSlides = 3;

  const [activeIndex, setActiveIndex] = useState(0);
  const bgImage = data[activeIndex]?.image;
  const swiperRef = useRef<SwiperRef>(null);
  const activeIndexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const moveTo = useCallback(
    (index: number) => {
      const swiper = swiperRef.current?.swiper;
      activeIndexRef.current = index;
      setActiveIndex(index);

      if (swiper) {
        const currentPerView =
          typeof swiper.params.slidesPerView === "number"
            ? swiper.params.slidesPerView
            : visibleSlides;
        const firstVisible = swiper.activeIndex;
        const lastVisible = firstVisible + currentPerView - 1;

        if (currentPerView <= 1) {
          swiper.slideTo(index);
        } else if (index > lastVisible) {
          swiper.slideNext();
        } else if (index < firstVisible) {
          swiper.slidePrev();
        }
      }
    },
    [visibleSlides]
  );

  const goNext = useCallback(() => {
    const nextIndex = (activeIndexRef.current + 1) % totalSlides;
    moveTo(nextIndex);
  }, [totalSlides, moveTo]);

  const goPrev = useCallback(() => {
    const prevIndex = (activeIndexRef.current - 1 + totalSlides) % totalSlides;
    moveTo(prevIndex);
  }, [totalSlides, moveTo]);

  // Start/restart the auto-play interval
  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goNext, 4500);
  }, [goNext]);

  // Auto-slide on mount
  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  // Handle title click — set active + reset timer
  const handleTitleClick = useCallback(
    (index: number) => {
      moveTo(index);
      startInterval(); // reset countdown on manual interaction
    },
    [moveTo, startInterval]
  );

  // Handle nav button clicks — also reset timer
  const handleNext = useCallback(() => {
    goNext();
    startInterval();
  }, [goNext, startInterval]);

  const handlePrev = useCallback(() => {
    goPrev();
    startInterval();
  }, [goPrev, startInterval]);

  if (!data || data.length === 0) return null;

  return (
    <motion.div
      variants={moveUp(0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="relative"
    >
      <section
        className="transition-colors duration-500 h-auto xl:h-[600px] relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full afterbgf"
        style={{ background: `url(${bgImage}) center/cover no-repeat` }}
      >
        <div className="container relative h-full w-full">
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="w-full pt-5 md:pt-0"
          >
            <Swiper
              ref={swiperRef}
              allowTouchMove={false}
              className="islider"
              loop={false}
              rewind={true}
              modules={[Navigation]}
              speed={1800}
              breakpoints={{
                0: { slidesPerView: 1 },
                590: { slidesPerView: 2 },
                1024: { slidesPerView: visibleSlides },
              }}
            >
              {data.map((item, index: number) => (
                <SwiperSlide key={index}>
                  <motion.div
                    variants={moveUp(index * 0.25)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <div
                      className="itmmn h-[411px] flex flex-col justify-start transition-all duration-300"
                      style={ activeIndex === index
                          ? { background: "linear-gradient(180deg, rgba(0,0,0,0.56) 0%, rgba(0,0,0,0.0) 100%)",
                              backdropFilter: "blur(1px)",
                            }
                          : {}
                      }
                    >
                      <div className="transition-all duration-300">
                        {/* ===== MAIN TITLE (Clickable) ===== */}
                        <div
                          onClick={() => handleTitleClick(index)}
                          className={`bgsre transition-all duration-300 cursor-pointer border-b border-[#c2c2c2] ${
                            activeIndex === index
                              ? "bg-primary"
                              : "bg-white/8 backdrop-blur-[1px]"
                          }`}
                        >
                          <h3 className="text-xl xl:text-2xl leading-[1] font-normal text-white px-2 py-3 md:py-5 md:p-8 lg:p-10">
                            {item.mainTitle}
                          </h3>
                        </div>

                        {/* ===== SUBTITLE + DESCRIPTION (Only active slide) ===== */}
                        <div className={`px-6 lg:px-10 py-57px transition-all duration-500 ${
                            activeIndex === index
                              ? "opacity-100 max-h-[800px] pointer-events-auto"
                              : "opacity-0 max-h-0 overflow-hidden pointer-events-none"
                          }`}
                        >
                          <p className="text-white xl:text-22 mb-[18px] xl:mb-[23px] leading-[1.3] !text-left">
                            {item.subTitle}
                          </p>
                          <div className="ai-technology-items"
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons */}
            <div className="cursor-pointer absolute bottom-2 right-2 md:top-[40%] ring-1 ring-white md:ring-0 xl:-right-3 2xl:-right-8 z-50 w-[50px] h-[50px] xl:w-[65px] xl:h-[65px] 2xl:w-[94px] 2xl:h-[94px] bg-black rounded-full flex items-center justify-center gap-4 xl:gap-6">
              <button
                onClick={handlePrev}
                className="text-accent w-2 xl:w-[12px] h-auto cursor-pointer"
              >
                <svg width="15" height="26" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" >
                  <path d="M14 1L2 13L14 25" stroke="#7AC142" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <button onClick={handleNext} className="text-accent w-2 xl:w-[12px] h-auto cursor-pointer" >
                <svg width="15" height="26" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" >
                  <path d="M1 1L13 13L1 25" stroke="#7AC142" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default AiSlider;
