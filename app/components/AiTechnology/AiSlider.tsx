"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import { useState, useRef, useEffect } from "react";
import { Autoplay, Navigation } from "swiper/modules";
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
  const [bgImage, setBgImage] = useState(data[0]?.image);
  const swiperRef = useRef<SwiperRef>(null);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      goNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const goNext = () => {
    let nextIndex = activeIndex + 1;
    if (nextIndex >= totalSlides) {
      nextIndex = 0;
      swiperRef.current?.swiper.slideToLoop(0);
    } else if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      const firstVisible = swiper.realIndex;
      if (nextIndex >= firstVisible + visibleSlides) {
        swiper.slideNext();
      }
    }
    setActiveIndex(nextIndex);
    setBgImage(data[nextIndex].image);
  };

  const goPrev = () => {
    let prevIndex = activeIndex - 1;
    if (prevIndex < 0) {
      prevIndex = totalSlides - 1;
      swiperRef.current?.swiper.slideToLoop(prevIndex);
    } else if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      const firstVisible = swiper.realIndex;
      if (prevIndex < firstVisible) {
        swiper.slidePrev();
      }
    }
    setActiveIndex(prevIndex);
    setBgImage(data[prevIndex].image);
  };

  return (
    <motion.div
      variants={moveUp(0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="relative"
    >
      <section
        className="transition-all duration-500 h-[400px] lg:h-[500px] xl:h-[750px] relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full afterbgf"
        style={{ background: `url(${bgImage}) center/cover no-repeat` }}
      >
        <div className="container relative h-full w-full">
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="border-b border-smgray w-full pt-5 md:pt-0"
          >
            <Swiper
              ref={swiperRef}
              allowTouchMove={false}
              className="md:border-b border-smgray aislider"
              slidesPerView={visibleSlides}
              loop={true}
              spaceBetween={20}
              modules={[Navigation, Autoplay]}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 10 },
                590: { slidesPerView: 2, spaceBetween: 15 },
                1024: { slidesPerView: visibleSlides, spaceBetween: 20 },
              }}
            >
              {data.map((item, index: number) => (
                <SwiperSlide key={index}>
                  <motion.div
                    variants={moveUp(0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <div
                      className={`itmmn h-[360px] lg:h-[450px] xl:h-[700px] flex flex-col justify-end transition-all duration-300
                        ${
                          activeIndex === index
                            ? "bg-[#ffffff40]"
                            : "bg-[#ffffff10] md:bg-transparent"
                        }`}
                    >
                      <div
                        className={`transition-all duration-300 px-5 py-5 lg:pb-12 ${
                          activeIndex === index ? "opacity-100" : "md:opacity-0"
                        }`}
                      >
                        <p className="text-white text-22 mb-[18px] xl:mb-[23px] leading-[1.3]">
                          {item.subTitle}
                        </p>
                        <div
                          className="ai-technology-items"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        ></div>
                      </div>
                      <div>
                        <div
                          className={`bgsre px-2 py-3 md:py-5 md:p-8 lg:p-10 transition-all duration-300 cursor-pointer ${
                            activeIndex === index
                              ? "bg-primary"
                              : "bg-primary md:bg-transparent"
                          }`}
                        >
                          <h3 className="text-xl xl:text-2xl leading-[1] font-normal text-white">
                            {item.mainTitle}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons */}
            <div className="cursor-pointer absolute top-1/3 right-[-10px] xl:top-[40%] xl:-right-8 z-50 w-[50px] h-[50px] xl:w-[94px] xl:h-[94px] bg-black rounded-full flex items-center justify-center gap-4 xl:gap-6">
              {/* Custom Navigation Buttons */}
              <button
                onClick={goPrev}
                className="text-accent w-2 xl:w-[12px] h-auto cursor-pointer"
              >
                <svg
                  width="15"
                  height="26"
                  viewBox="0 0 15 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    d="M14 1L2 13L14 25"
                    stroke="#7AC142"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <button
                onClick={goNext}
                className="text-accent w-2 xl:w-[12px] h-auto cursor-pointer"
              >
                <svg
                  width="15"
                  height="26"
                  viewBox="0 0 15 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    d="M1 1L13 13L1 25"
                    stroke="#7AC142"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
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
