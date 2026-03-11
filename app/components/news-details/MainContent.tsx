"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation } from "swiper/modules";

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
  return (
    <div>
      <motion.h3
        variants={moveUp()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-xl xl:text-2xl leading-lh-text32 font-normal mb-5 xl:mb-[27px] text-black dark:text-white"
      >
        {subTitle}
      </motion.h3>
      <motion.div variants={moveUp(0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative h-fit">
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            loop={false}
            hashNavigation={true}
            grabCursor={true}
            // autoplay={{ delay: 2000, disableOnInteraction: true, pauseOnMouseEnter: true }}
            // speed={800}
            navigation={true}
            className="news-slider relative"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="relative max-h-[600px]">
                <Image src={image} width={1000} height={1000} alt="" className="w-full h-[400px] xl:h-[550px] 2xl:h-[700px] object-cover" />
              </SwiperSlide>
            ))}
           
          </Swiper>
          {/* <div className="absolute bottom-30px left-30px z-50 flex gap-5 w-[200px]">
                <div className="swiper-button-next cursor-pointer bg-white w-12 h-12 xl:w-20 xl:h-20 rounded-full flex items-center justify-center" aria-label="Next">
                  <svg width="15" height="26" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 1L2 13L14 25" stroke="#7AC142" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </div>
                <div className="swiper-button-prev cursor-pointer bg-white w-12 h-12 xl:w-20 xl:h-20 rounded-full flex items-center justify-center" aria-label="Previous">
                  <svg width="15" height="26" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 25L13 13L1 1" stroke="#7AC142" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </div>
              </div> */}

        </motion.div>
      <motion.div
        variants={moveUp(0.4)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex items-center justify-between mb-3 md:mb-5 xl:mb-[27px] mt-3 xl:mt-[17px] gap-3 text-para-color dark:text-white/70"
      >
        <span className="text-[16px] uppercase">{sector}</span>
        <span className="text-[16px]">{date}</span>
      </motion.div>
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
      <motion.div dangerouslySetInnerHTML={{ __html: content }} className="news-details [&_p]:!text-base 2xl:[&_p]:!text-lg [&_p]:!leading-[1.5] 2xl:leading-[1.5]"/>

      
    </div>
  );
};

export default MainContent;
