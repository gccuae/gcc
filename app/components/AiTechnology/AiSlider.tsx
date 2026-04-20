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
  const [pressedNav, setPressedNav] = useState<'prev' | 'next' | null>(null);
  const [isSingleSlideMode, setIsSingleSlideMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [displayBgImage, setDisplayBgImage] = useState(data[0]?.image || "");
  const [overlayBgImage, setOverlayBgImage] = useState<string | null>(null);
  const [isBgTransitioning, setIsBgTransitioning] = useState(false);
  const swiperRef = useRef<SwiperRef>(null);
  const activeIndexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bgTransitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bgTransitionFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const nextImage = data[activeIndex]?.image || "";
    if (!nextImage || nextImage === displayBgImage) return;

    setOverlayBgImage(nextImage);
    setIsBgTransitioning(false);

    if (bgTransitionTimeoutRef.current) {
      clearTimeout(bgTransitionTimeoutRef.current);
    }
    if (bgTransitionFrameRef.current) {
      cancelAnimationFrame(bgTransitionFrameRef.current);
    }

    bgTransitionFrameRef.current = requestAnimationFrame(() => {
      setIsBgTransitioning(true);
    });

    bgTransitionTimeoutRef.current = setTimeout(() => {
      setDisplayBgImage(nextImage);
      setOverlayBgImage(null);
      setIsBgTransitioning(false);
    }, 550);

    return () => {
      if (bgTransitionTimeoutRef.current) {
        clearTimeout(bgTransitionTimeoutRef.current);
      }
      if (bgTransitionFrameRef.current) {
        cancelAnimationFrame(bgTransitionFrameRef.current);
      }
    };
  }, [activeIndex, data, displayBgImage]);



  useEffect(() => {
    const updateSingleSlideMode = () => {
      const swiper = swiperRef.current?.swiper;
      const mobile = window.innerWidth < 590;
      const slidesPerView =
        typeof swiper?.params.slidesPerView === "number"
          ? swiper.params.slidesPerView
          : mobile
            ? 1
            : window.innerWidth < 1024
              ? 2
              : visibleSlides;

      setIsMobile(mobile);
      setIsSingleSlideMode(slidesPerView <= 1);
    };

    updateSingleSlideMode();
    window.addEventListener("resize", updateSingleSlideMode);

    return () => window.removeEventListener("resize", updateSingleSlideMode);
  }, [visibleSlides]);

  const moveTo = useCallback(
    (index: number) => {
      const swiper = swiperRef.current?.swiper;

      if (swiper) {
        const currentPerView =
          typeof swiper.params.slidesPerView === "number"
            ? swiper.params.slidesPerView
            : visibleSlides;
        const firstVisible = swiper.activeIndex;
        const lastVisible = firstVisible + currentPerView - 1;

        // Update ref immediately so goNext/goPrev math stays correct
        activeIndexRef.current = index;

        if (currentPerView <= 1) {
          // Mobile: slideTo handles everything; activeIndex synced in onSlideChangeTransitionEnd
          swiper.slideTo(index, 1800);
        } else {
          // Desktop: don't setActiveIndex yet — wait for transition to finish
          // so the expanded content doesn't jump before the slide animates
          if (index > lastVisible) {
            swiper.slideNext();
          } else if (index < firstVisible) {
            swiper.slidePrev();
          } else {
            // Slide already visible — safe to update immediately
            setActiveIndex(index);
          }
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

  // Stop the auto-play interval
  const stopInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  // Start/restart the auto-play interval
  const startInterval = useCallback(() => {
    stopInterval();
    intervalRef.current = setInterval(goNext, 4500);
  }, [goNext, stopInterval]);

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

  // Handle nav button clicks — also reset timer + highlight pressed arrow
  const handleNext = useCallback(() => {
    goNext();
    startInterval();
    setPressedNav('next');
    setTimeout(() => setPressedNav(null), 1800);
  }, [goNext, startInterval]);

  const handlePrev = useCallback(() => {
    goPrev();
    startInterval();
    setPressedNav('prev');
    setTimeout(() => setPressedNav(null), 1800);
  }, [goPrev, startInterval]);

  if (!data || data.length === 0) return null;

  return (

    <section className="transition-colors duration-500 h-auto xl:h-[600px] relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full afterbgf"
    >
      <div
        className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat transition-opacity duration-500"
        style={{ backgroundImage: `url(${displayBgImage})` }}
      />
      {overlayBgImage && (
        <div
          className={`absolute inset-0 z-0 bg-center bg-cover bg-no-repeat transition-opacity duration-500 ${
            isBgTransitioning ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${overlayBgImage})` }}
        />
      )}
      <div className="container relative h-full w-full">
        <motion.div
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="w-full pt-5 md:pt-0"
        >
          <Swiper
            key={isMobile ? "mobile" : "desktop"}
            ref={swiperRef}
            allowTouchMove={true}
            className="islider"
            loop={isMobile}
            rewind={!isMobile}
            modules={[Navigation]}
            speed={1800}
            grabCursor={true}
            onSwiper={() => {
              const swiper = swiperRef.current?.swiper;
              const currentPerView =
                typeof swiper?.params.slidesPerView === "number"
                  ? swiper.params.slidesPerView
                  : visibleSlides;
              setIsSingleSlideMode(currentPerView <= 1);
            }}
            onTouchStart={() => stopInterval()}
            onTouchEnd={() => startInterval()}
            onSlideChangeTransitionEnd={(swiper) => {
              const currentPerView =
                typeof swiper.params.slidesPerView === "number"
                  ? swiper.params.slidesPerView
                  : visibleSlides;

              setIsSingleSlideMode(currentPerView <= 1);

              if (currentPerView <= 1) {
                // Mobile: sync from swiper's real position (handles drag too)
                activeIndexRef.current = swiper.activeIndex;
                setActiveIndex(swiper.activeIndex);
              } else {
                // Desktop: now safe to show expanded content — slide has landed
                setActiveIndex(activeIndexRef.current);
              }
            }}
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
                  {(() => {
                    const isExpanded = isSingleSlideMode || activeIndex === index;

                    return (
                  <div
                    className="itmmn h-[411px] flex flex-col justify-start transition-all duration-300"
                    style={isExpanded
                      ? {
                        background: "linear-gradient(180deg, rgba(0,0,0,0.56) 0%, rgba(0,0,0,0.0) 100%)",
                        backdropFilter: "blur(1px)",
                      }
                      : {}
                    }
                  >
                    <div className="transition-all duration-300">
                      {/* ===== MAIN TITLE (Clickable) ===== */}
                      <div
                        onClick={() => handleTitleClick(index)}
                        className={`bgsre transition-all duration-300 cursor-pointer border-b border-[#c2c2c2] ${isExpanded
                            ? "bg-primary"
                            : "bg-white/8 backdrop-blur-[1px]"
                          }`}
                      >
                        <h3 className="text-xl xl:text-2xl leading-[1] font-normal text-white px-2 py-3 md:py-5 md:p-8 lg:p-10">
                          {item.mainTitle}
                        </h3>
                      </div>

                      {/* ===== SUBTITLE + DESCRIPTION (Only active slide) ===== */}
                      <div className={`px-6 lg:px-10 py-57px transition-all duration-500 ${isExpanded
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
                    );
                  })()}
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons — Split Half-Circle */}
          <div className="absolute bottom-2 right-2 md:top-[40%] xl:-right-3 2xl:-right-8 z-10 w-[50px] h-[50px] xl:w-[65px] xl:h-[65px] 2xl:w-[94px] 2xl:h-[94px] flex ring-1 ring-transparent rounded-full overflow-hidden">
            {/* Prev — Left half */}
            <button
              onClick={handlePrev}
              className={`group w-1/2 h-full flex items-center justify-center transition-all duration-300 cursor-pointer border-r border-transparent
                ${
                  pressedNav === 'prev'
                    ? 'bg-primary text-white'
                    : 'bg-black text-[#7AC142] hover:bg-primary hover:text-white'
                }`}
            >
              <svg width="10" height="20" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="w-[35%] h-auto transition-transform duration-300 translate-x-[8px] group-hover:translate-x-0">
                <path
                  d="M14 1L2 13L14 25"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Next — Right half */}
            <button
              onClick={handleNext}
              className={`group w-1/2 h-full flex items-center justify-center transition-all duration-300 cursor-pointer
                ${
                  pressedNav === 'next'
                    ? 'bg-primary text-white'
                    : 'bg-black text-[#7AC142] hover:bg-primary hover:text-white'
                }`}
            >
              <svg width="10" height="20" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="w-[35%] h-auto transition-transform duration-300 -translate-x-[8px] group-hover:translate-x-0">
                <path
                  d="M1 1L13 13L1 25"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>

  );
};

export default AiSlider;
