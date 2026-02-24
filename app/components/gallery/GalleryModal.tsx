"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryType } from "./type";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

interface GalleryModalProps {
  item: GalleryType['items'][number]; // single album item
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ item, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [thumbAtStart, setThumbAtStart] = useState(true);
  const [thumbAtEnd, setThumbAtEnd] = useState(false);
  const thumbsSwiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? item.images.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === item.images.length - 1 ? 0 : prev + 1));
  };

  const selectImage = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (thumbsSwiperRef.current) {
      thumbsSwiperRef.current.slideTo(currentIndex);
      setThumbAtStart(thumbsSwiperRef.current.isBeginning);
      setThumbAtEnd(thumbsSwiperRef.current.isEnd);
    }
  }, [currentIndex]);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80"
    >
      <div className="container overflow-hidden">
        {/* Overlay */}
        <div
          className="absolute bg-black/80 inset-0 cursor-pointer"
          onClick={onClose}
        />

        {/* Modal Content */}
        <div className="relative z-10 w-full overflow-y-auto">
          {/* Header */}
          <div className="relative flex items-center justify-center mb-[15px]">
            <div className="absolute left-1/2 transform -translate-x-1/2 text-white text-25 leading-[40px] md:text-center w-full">
              {item.item}
            </div>

            <button onClick={onClose} className="ml-auto text-white text-[40px] font-light z-20 cursor-pointer" >
              &times;
            </button>
          </div>

          {/* Image Viewer */}
          <div className="rounded-[12px] flex flex-col items-center justify-center relative w-full">
            {/* Prev */}
            <button
              onClick={goPrev}
              className="absolute left-0 lg:top-1/2 top-0 lg:-translate-y-1/2 translate-y-0 cursor-pointer"
            >
              <SlArrowLeft className="text-white hover:text-primary transition-all duration-300 h-[20px] lg:h-[28px] w-[20px] lg:w-[28px]" />
            </button>

            {/* Image */}
            <div className="relative mt-10 lg:mt-0 w-full lg:w-[800px] rounded-[12px] xl:w-[1000px] 2xl:w-[1264px] h-[450px] max-h-[640px] flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={item?.images[currentIndex]?.image}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image src={item?.images[currentIndex]?.image} alt={`slide-${currentIndex}`} fill className="object-contain rounded-[12px]" sizes="(max-width: 768px) 100vw, 80vw" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next */}
            <button onClick={goNext}
              className="absolute right-0 lg:top-1/2 top-0 lg:-translate-y-1/2 translate-y-0 cursor-pointer"
            >
              <SlArrowRight className="text-white hover:text-primary transition-all duration-300 h-[20px] lg:h-[28px] w-[20px] lg:w-[28px]" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="relative mt-[15px] lg:mt-[30px] px-8">
            <button
              type="button"
              onClick={() => thumbsSwiperRef.current?.slidePrev()}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 ${
                thumbAtStart ? "opacity-40 cursor-default" : "opacity-100 cursor-pointer"
              }`}
            >
              <SlArrowLeft className="text-white hover:text-primary transition-all duration-300 h-[16px] lg:h-[20px] w-[16px] lg:w-[20px]" />
            </button>

            <Swiper
              slidesPerView="auto"
              spaceBetween={10}
              onSwiper={(swiper) => {
                thumbsSwiperRef.current = swiper;
                swiper.slideTo(currentIndex, 0);
                setThumbAtStart(swiper.isBeginning);
                setThumbAtEnd(swiper.isEnd);
              }}
              onSlideChange={(swiper) => {
                setThumbAtStart(swiper.isBeginning);
                setThumbAtEnd(swiper.isEnd);
              }}
              onResize={(swiper) => {
                setThumbAtStart(swiper.isBeginning);
                setThumbAtEnd(swiper.isEnd);
              }}
            >
              {item.images.map((img, idx) => {
                const isActive = currentIndex === idx;

                return (
                  <SwiperSlide key={idx} className="!w-auto !h-auto">
                    <div
                      onClick={() => selectImage(idx)}
                      className="relative flex items-center justify-center rounded-[9px] overflow-hidden cursor-pointer transition-all duration-200"
                      style={{ height: "73px" }}
                    >
                      <div
                        className="relative rounded-[9px] w-full h-full flex items-center justify-center"
                        style={{
                          width: isActive ? "110px" : "80px",
                          height: isActive ? "73px" : "54px",
                          margin: "auto",
                          transition: "width 0.2s, height 0.2s",
                        }}
                      >
                        <Image src={img.image} alt={`thumb-${idx}`} width={isActive ? 110 : 80} height={isActive ? 73 : 54} className="object-cover rounded-[9px] w-full h-full" />
                        {!isActive && (
                          <div className="absolute inset-0 bg-white/60 rounded-[9px] pointer-events-none transition-opacity duration-200" />
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <button
              type="button"
              onClick={() => thumbsSwiperRef.current?.slideNext()}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 ${
                thumbAtEnd ? "opacity-40 cursor-default" : "opacity-100 cursor-pointer"
              }`}
            >
              <SlArrowRight className="text-white hover:text-primary transition-all duration-300 h-[16px] lg:h-[20px] w-[16px] lg:w-[20px]" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>,
    document.body
  );
};

export default GalleryModal;
