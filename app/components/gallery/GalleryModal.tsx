"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryType } from "./type";

interface GalleryModalProps {
  item: GalleryType['items'][number];
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ item, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const imageCount = item.images.length;
  const hasImages = imageCount > 0;

  useEffect(() => {
    setMounted(true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!hasImages) {
      setCurrentIndex(0);
      return;
    }

    setCurrentIndex((prev) => Math.min(prev, imageCount - 1));
  }, [hasImages, imageCount, item]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    const el = thumbRefs.current[currentIndex];
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex]);

  const goPrev = () => {
    if (!hasImages) return;
    setCurrentIndex((prev) => (prev === 0 ? imageCount - 1 : prev - 1));
  };

  const goNext = () => {
    if (!hasImages) return;
    setCurrentIndex((prev) => (prev === imageCount - 1 ? 0 : prev + 1));
  };

  const selectImage = (index: number) => {
    if (!hasImages) return;
    setCurrentIndex(index);
  };

  if (!mounted) return null;

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.item}
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

            <button
              type="button"
              onClick={onClose}
              className="absolute right-0 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/40 text-2xl font-light text-white backdrop-blur-sm sm:h-10 sm:w-10 sm:text-[34px]"
            >
              &times;
            </button>
          </div>

          {/* Image Viewer */}
          <div className="relative flex w-full flex-col items-center justify-center rounded-[12px]">
            {/* Prev */}
            <button
              type="button"
              onClick={goPrev}
              disabled={!hasImages}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-black/50 p-2 backdrop-blur-sm disabled:cursor-default disabled:opacity-40 sm:left-0 sm:bg-transparent sm:p-0"
            >
              <SlArrowLeft className="h-4 w-4 text-white transition-all duration-300 hover:text-primary sm:h-[20px] sm:w-[20px] lg:h-[28px] lg:w-[28px]" />
            </button>

            {/* Image */}
            <div className="relative mt-2 flex h-[240px] max-h-[70dvh] 3xl:max-h-[85dvh] w-full items-center justify-center overflow-hidden rounded-[12px] sm:mt-4 sm:h-[320px] md:h-[70vh] xl:h-[70vh] lg:mt-0 lg:w-[800px] lg:max-h-[640px] xl:w-[1000px] 2xl:w-[1264px]">
              {hasImages ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={item.images[currentIndex].image}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={item.images[currentIndex].image}
                      alt={`${item.item} image ${currentIndex + 1}`}
                      fill
                      className="h-auto rounded-[12px] object-contain"
                      sizes="(max-width: 768px) 100vw, 80vw"
                    />
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-[12px] border border-white/10 bg-white/5 px-6 text-center text-sm text-white/70 sm:text-base">
                  No gallery images available for this item.
                </div>
              )}
            </div>

            {/* Next */}
            <button
              type="button"
              onClick={goNext}
              disabled={!hasImages}
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-black/50 p-2 backdrop-blur-sm disabled:cursor-default disabled:opacity-40 sm:right-0 sm:bg-transparent sm:p-0"
            >
              <SlArrowRight className="h-4 w-4 text-white transition-all duration-300 hover:text-primary sm:h-[20px] sm:w-[20px] lg:h-[28px] lg:w-[28px]" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="relative mt-4 px-6 sm:mt-[15px] sm:px-8 lg:mt-[30px]">
            <button
              type="button"
              onClick={goPrev}
              disabled={!hasImages}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 ${!hasImages ? "opacity-40 cursor-default" : "opacity-100 cursor-pointer"
                }`}
            >
              <SlArrowLeft className="h-[14px] w-[14px] text-white transition-all duration-300 hover:text-primary sm:h-[16px] sm:w-[16px] lg:h-[20px] lg:w-[20px]" />
            </button>

            {/* Scrollable thumb strip */}
            <div className="flex gap-[10px] overflow-x-auto scroll-smooth scrollbar-none px-1 items-center justify-start">
              {item.images.map((img, idx) => {
                const isActive = currentIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    ref={(el) => { thumbRefs.current[idx] = el; }}
                    onClick={() => selectImage(idx)}
                    aria-label={`Show image ${idx + 1}`}
                    aria-pressed={isActive}
                    className="relative flex-shrink-0 cursor-pointer rounded-[9px] overflow-hidden transition-all duration-200"
                    style={{
                      width: isActive ? "84px" : "64px",
                      height: isActive ? "56px" : "44px",
                    }}
                  >
                    <Image
                      src={img.image}
                      alt={`thumb-${idx}`}
                      fill
                      className="object-cover rounded-[9px]"
                      sizes="110px"
                    />
                    {!isActive && (
                      <div className="absolute inset-0 bg-white/60 rounded-[9px] pointer-events-none transition-opacity duration-200" />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={goNext}
              disabled={!hasImages}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 ${!hasImages ? "opacity-40 cursor-default" : "opacity-100 cursor-pointer"
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