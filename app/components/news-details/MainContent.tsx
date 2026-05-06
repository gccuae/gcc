"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import type { Swiper as SwiperType } from "swiper";

const MainContent = ({
  subTitle,
  sector,
  date,
  content,
  images
}: {
  subTitle: string;
  sector: string;
  date: string;
  content: string;
  images: string[];
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const hasMultipleImages = images.length > 1;

  return (
    <div>
      <motion.h3
        variants={moveUp(0.2)}
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        className="text-xl xl:text-2xl leading-lh-text32 font-normal mb-5 xl:mb-[27px] text-black dark:text-white"
      >
        {subTitle}
      </motion.h3>
      <motion.div variants={moveUp(0.4)}
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        className="relative h-fit">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={false}
            hashNavigation={true}
            grabCursor={true}
            // autoplay={{ delay: 2000, disableOnInteraction: true, pauseOnMouseEnter: true }}
            // speed={800}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="news-slider relative"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="relative max-h-[600px]">
                <Image src={image} width={1000} height={1000} alt="" className="w-full h-[250px] lg:h-[400px] xl:h-[550px] 2xl:h-[600px] object-cover" />
              </SwiperSlide>
            ))}
           
          </Swiper>
          {hasMultipleImages && (
            <div className="absolute bottom-5 xl:bottom-30px right-5 xl:right-30px z-[60] flex w-[200px] justify-end gap-2 xl:gap-5">
              <button onClick={() => swiperRef.current?.slideNext()} type="button" className="cursor-pointer rounded-full bg-white/90 flex h-10 w-10 items-center justify-center leading-none transition-colors duration-300 hover:bg-[#0b0b0b] xl:h-20 xl:w-20" aria-label="Next">
                <svg width="15" height="26" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="block h-[14px] w-[14px] xl:translate-x-[-3px] md:h-[22px] md:w-[14px] xl:h-[28px] xl:w-[18px]">
                  <path d="M14 1L2 13L14 25" stroke="#7AC142" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <button onClick={() => swiperRef.current?.slidePrev()} type="button" className="cursor-pointer rounded-full bg-white/90 flex h-10 w-10 items-center justify-center leading-none transition-colors duration-300 hover:bg-[#0b0b0b] xl:h-20 xl:w-20" aria-label="Previous">
                <svg width="15" height="26" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="block h-[14px] w-[14px] xl:translate-x-[3px] md:h-[22px] md:w-[14px] xl:h-[28px] xl:w-[18px]">
                  <path d="M1 25L13 13L1 1" stroke="#7AC142" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          )}

        </motion.div>
      {/* <motion.div
        variants={moveUp(0.4)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex items-center justify-between mb-3 md:mb-5 xl:mb-[27px] mt-3 xl:mt-[17px] gap-3 text-para-color dark:text-white/70"
      >
        <span className="text-[16px] uppercase">{sector}</span>
        <span className="text-[16px]">{date}</span>
      </motion.div> */}
      {/* {desc.map((item, index) => (
        <motion.p
          key={index}
          className="mb-5 xl:mb-[27px] text-lg xl:text-21 leading-[1.380952380952381] font-normal text-foreground dark:text-white/70"
          variants={moveUp(index * 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {item}
        </motion.p>
      ))} */}
     <div className="mt-3 md:mt-6">
        <motion.div
          variants={moveUp(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          dangerouslySetInnerHTML={{
            __html: content
              ?.replace(/&nbsp;/g, ' ')  
              .replace(/\u00a0/g, ' ')    
              .replace(/ {2,}/g, ' ')     
          }}
          className="news-details [&_p]:!text-base 2xl:[&_p]:!text-lg [&_p]:!leading-[1.7] [&_p]:!whitespace-normal [&_p]:!break-words"
        /> 
    </div>
    </div>
  );
};

export default MainContent;
