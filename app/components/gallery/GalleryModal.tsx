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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-3 py-4 sm:px-4 sm:py-6"
    >
      <div className="container overflow-hidden">
        {/* Overlay */}
        <div
          className="absolute bg-black/80 inset-0 cursor-pointer"
          onClick={onClose}
        />

        {/* Modal Content */}
        <div className="relative z-10 w-full max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-h-[calc(100dvh-3rem)]">
          {/* Header */}
          <div className="relative mb-4 flex min-h-10 items-center justify-center sm:mb-[15px]">
            <div className="w-full px-10 text-center text-xl leading-tight text-white sm:text-25 sm:leading-[40px]">
              {item.item}
            </div>

            <button onClick={onClose} className="absolute right-0 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/40 text-2xl font-light text-white backdrop-blur-sm sm:h-10 sm:w-10 sm:text-[34px]" >
              &times;
            </button>
          </div>

          {/* Image Viewer */}
          <div className="relative flex w-full flex-col items-center justify-center rounded-[12px]">
            {/* Prev */}
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-black/50 p-2 backdrop-blur-sm sm:left-0 sm:bg-transparent sm:p-0"
            >
              <SlArrowLeft className="h-4 w-4 text-white transition-all duration-300 hover:text-primary sm:h-[20px] sm:w-[20px] lg:h-[28px] lg:w-[28px]" />
            </button>

            {/* Image */}
            <div className="relative mt-2 flex h-[240px] max-h-[70dvh] w-full items-center justify-center overflow-hidden rounded-[12px] sm:mt-4 sm:h-[320px] md:h-[420px] lg:mt-0 lg:w-[800px] lg:max-h-[640px] xl:w-[1000px] 2xl:w-[1264px]">
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
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-black/50 p-2 backdrop-blur-sm sm:right-0 sm:bg-transparent sm:p-0"
            >
              <SlArrowRight className="h-4 w-4 text-white transition-all duration-300 hover:text-primary sm:h-[20px] sm:w-[20px] lg:h-[28px] lg:w-[28px]" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="relative mt-4 px-6 sm:mt-[15px] sm:px-8 lg:mt-[30px]">
            <button
              type="button"
              onClick={() => thumbsSwiperRef.current?.slidePrev()}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 ${
                thumbAtStart ? "opacity-40 cursor-default" : "opacity-100 cursor-pointer"
              }`}
            >
              <SlArrowLeft className="h-[14px] w-[14px] text-white transition-all duration-300 hover:text-primary sm:h-[16px] sm:w-[16px] lg:h-[20px] lg:w-[20px]" />
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
                      className="relative flex h-[56px] items-center justify-center overflow-hidden rounded-[9px] cursor-pointer transition-all duration-200 sm:h-[73px]"
                    >
                      <div
                        className="relative rounded-[9px] w-full h-full flex items-center justify-center"
                        style={{
                          width: isActive ? "84px" : "64px",
                          height: isActive ? "56px" : "44px",
                          margin: "auto",
                          transition: "width 0.2s, height 0.2s",
                        }}
                      >
                        <Image src={img.image} alt={`thumb-${idx}`} width={isActive ? 84 : 64} height={isActive ? 56 : 44} className="h-full w-full rounded-[9px] object-cover sm:hidden" />
                        <Image src={img.image} alt={`thumb-${idx}`} width={isActive ? 110 : 80} height={isActive ? 73 : 54} className="hidden h-full w-full rounded-[9px] object-cover sm:block" />
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
              <SlArrowRight className="h-[14px] w-[14px] text-white transition-all duration-300 hover:text-primary sm:h-[16px] sm:w-[16px] lg:h-[20px] lg:w-[20px]" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>,
    document.body
  );
};

export default GalleryModal;
