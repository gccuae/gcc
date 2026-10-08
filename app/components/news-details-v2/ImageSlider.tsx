"use client";

import Image from "next/image";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import type { Swiper as SwiperType } from "swiper";

const ImageSlider = ({ images }: { images: string[] }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const hasMultipleImages = images.length > 1;

  return (
    <>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={false}
        hashNavigation={true}
        grabCursor={true}
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
    </>
  );
};

export default ImageSlider;
