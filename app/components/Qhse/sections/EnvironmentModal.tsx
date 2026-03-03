"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { QhseType } from "../type";

interface EnvironmentModalProps {
  item: QhseType['forthSection']['items'][number]
  onClose: () => void;
}

const EnvironmentModal: React.FC<EnvironmentModalProps> = ({
  item,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

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

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black"
    >
      <div className="container overflow-hidden">
        {/* Overlay */}
        <div
          className="absolute bg-white/10 dark:bg-black/10 inset-0 cursor-pointer"
          onClick={onClose}
        />

        {/* Modal Content */}
        <div className="relative z-10 w-full overflow-y-auto">
          {/* Header with centered title and right-aligned close button */}
          <div className="relative flex items-center justify-center mb-[15px]">
            {/* Centered Title */}
            <div className="absolute left-1/2 transform -translate-x-1/2 text-black text-2xl leading-lh-text32 md:text-center w-full dark:text-white">
              {item.title}
            </div>

            {/* Close Button on the right */}
            <button
              onClick={onClose}
              className="ml-auto text-black text-[40px] font-light z-20 cursor-pointer dark:text-white"
            >
              &times;
            </button>
          </div>

          {/* Image Viewer */}
          <div className="rounded-[12px] flex flex-col items-center justify-center relative w-full">
            {/* Navigation Buttons */}
            <button
              onClick={goPrev}
              className="absolute left-0 lg:top-1/2 top-0 lg:-translate-y-1/2 translate-y-0 cursor-pointer dark:text-white"
            >
              <SlArrowLeft className="text-black dark:text-white hover:text-primary transition-all duration-300 h-[20px] lg:h-[28px] w-[20px] lg:w-[28px]" />
            </button>

            {/* Image Container */}
            <div className="relative mt-10 lg:mt-0 w-full lg:w-[800px] rounded-[12px] xl:w-[1000px] 2xl:w-[1264px] h-[450px] 2xl:h-[600px] max-h-[800px] flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.images[currentIndex]?.image}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image src={item.images[currentIndex]?.image} alt={`slide-${currentIndex}`} fill className="object-contain object-top rounded-[12px] w-auto" sizes="(max-width: 768px) 100vw, 80vw" />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={goNext}
              className="absolute right-0 lg:top-1/2 top-0 lg:-translate-y-1/2 translate-y-0 cursor-pointer dark:text-black"
            >
              <SlArrowRight className="text-black dark:text-white hover:text-primary transition-all duration-300 h-[20px] lg:h-[28px] w-[20px] lg:w-[28px]" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex flex-wrap justify-center items-center mt-[15px] lg:mt-[30px] gap-[10px]">
            {item.images.map((img, idx) => {
              const isActive = currentIndex === idx;

              return (
                <div
                  key={idx}
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
                    <Image
                      src={img.image}
                      alt={`thumb-${idx}`}
                      width={isActive ? 110 : 80}
                      height={isActive ? 73 : 54}
                      className="object-cover rounded-[9px] w-full h-full"
                    />
                    {!isActive && (
                      <div className="absolute inset-0 bg-white/60 rounded-[9px] pointer-events-none transition-opacity duration-200" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>,
    document.body
  );
};

export default EnvironmentModal;
