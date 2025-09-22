"use client";
import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation} from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from "next/image";
import { StaticImageData } from "next/image";

interface TimelineItem {
  year: number;
  title: string;
  description: string;
  backgroundImage: string | StaticImageData;
}

const LegacyTimelineSlider = ({ data, title }: { data: TimelineItem[], title: string }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const mainSwiperRef = useRef<SwiperType>(null);
  const yearSwiperRef = useRef<SwiperType>(null);

  const handleYearClick = (index: number) => {
    setActiveSlide(index);
    if (mainSwiperRef.current) {
      mainSwiperRef.current.slideToLoop(index);
    }
  };

  const handleMainSlideChange = (swiper: SwiperType) => {
    const realIndex = swiper.realIndex;
    setActiveSlide(realIndex);
    if (yearSwiperRef.current) {
      yearSwiperRef.current.slideToLoop(realIndex);
    }
  };

  const handleNavigation = (direction: 'next' | 'prev') => {
    if (mainSwiperRef.current) {
      if (direction === 'next') {
        mainSwiperRef.current.slideNext();
      } else {
        mainSwiperRef.current.slidePrev();
      }
    }
    if (yearSwiperRef.current) {
      if (direction === 'next') {
        yearSwiperRef.current.slideNext();
      } else {
        yearSwiperRef.current.slidePrev();
      }
    }
  };

  return (
    <div className="relative w-full h-[80vh] bg-black overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out">
          <Image src={data[activeSlide].backgroundImage} alt="" width={1920} height={1280} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="bg-black border-b-2 border-white overflow-hidden">
          <div className="container relative h-full">
            {/* Header */}
            <div className="pt-10 xl:pt-20 h-full pb-12 lg:pb-0">
              <h2 className="text-5xl leading-lh-title font-light text-white mb-8 xl:mb-10 tracking-wide">
                {title}
              </h2>
            </div>

            {/* Timeline Years Navigation Slider */}
            <div className="absolute bottom-0 lg:bottom-auto lg:top-19 right-0 flex items-center z-10 lg:h-full">
              {/* Year Slider Container */}
              <div className="overflow-hidden h-full">
                <Swiper
                  onSwiper={(swiper) => {
                    yearSwiperRef.current = swiper;
                  }}
                  modules={[Navigation]}
                  spaceBetween={32}
                  slidesPerView="auto"
                  loop={true}
                  speed={500}
                  allowTouchMove={false}
                  className="year-navigation-slider h-full"
                >
                  {data.map((item, index) => (
                    <SwiperSlide key={`year-${item.year}-${index}`} className="!w-[100px] !flex items-center flex-col justify-center">
                      <button
                        onClick={() => handleYearClick(index)}
                        className={`font-light transition-all duration-300 hover:text-white whitespace-nowrap ${activeSlide === index
                            ? 'text-white font-semibold text-2xl leading-[1] pb-5'
                          : 'text-gray-400 hover:text-gray-200 text-lg leading-[1]'
                          }`}
                      >
                        {item.year}
                      </button>
                      <div className={`w-[1px] h-full bg-accent ${activeSlide === index ? 'opacity-100' : 'opacity-0'}`}></div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Navigation Arrows - Control Both Sliders */}
              <div className="flex items-center space-x-[1px] absolute -top-2 right-0 z-10">
                <button
                  onClick={() => handleNavigation('prev')}
                  className="cursor-pointer py-2 px-4 rounded-l-2xl bg-white hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 text-accent" />
                </button>
                <button
                  onClick={() => handleNavigation('next')}
                  className="cursor-pointer py-2 px-4 rounded-r-2xl bg-white hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 text-accent" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Swiper Container */}
        <div className="flex-1 flex items-center relative z-50">
          <Swiper
            onSwiper={(swiper) => {
              mainSwiperRef.current = swiper;
            }}
            modules={[Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            speed={500}
            onSlideChange={handleMainSlideChange}
            className="w-full h-full history-slider relative z-50"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black from-0% to-black/0 to-100% z-0"></div>
            {data.map((item) => (
              <SwiperSlide key={item.year} className="history-slide">
                <div className="pl-8 md:pl-16 lg:pl-24 pr-8 md:pr-16 lg:pr-24 w-full">
                  <div className="container relative z-10">
                    {/* Year Display */}
                    <div className="text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6 opacity-90">
                      {item.year}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-6 leading-tight">
                      {item.title}
                    </h2>

                    {/* Description */}
                    <p className="text-base md:text-lg text-gray-200 leading-relaxed max-w-2xl font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .year-navigation-slider {
          overflow: visible !important;
        }
        
        .year-navigation-slider .swiper-wrapper {
          transition-timing-function: ease-in-out !important;
        }
        
        .year-navigation-slider .swiper-slide {
          transition: all 0.3s ease;
        }
        
        .history-slider .swiper-slide {
          transition: opacity 0.5s ease-in-out;
        }
        
        .history-slider .swiper-wrapper {
          transition-timing-function: ease-in-out !important;
        }
        
        @media (max-width: 768px) {
          .year-navigation-slider {
            max-width: 250px;
          }
        }
        
        @media (max-width: 640px) {
          .year-navigation-slider {
            max-width: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default LegacyTimelineSlider;