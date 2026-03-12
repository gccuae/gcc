"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { SecondSectionSecondSection } from "../expertise/type";

interface ScopsProps {
  data: SecondSectionSecondSection;
}

  const Scops = ({ data }: ScopsProps) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const totalItems = data.items.length;
  // Looping with too few slides can cause Swiper clone/reflow jitter on load.
  const canLoop = totalItems > 5;
  const maxVisibleSlides = canLoop ? totalItems - 0.1 : totalItems;
  const slidesPerView425 = Math.min(1.2, maxVisibleSlides);
  const slidesPerView768 = Math.min(3, maxVisibleSlides);
  const slidesPerView1024 = Math.min(3.5, maxVisibleSlides);
  const slidesPerView1280 = Math.min(4.5, maxVisibleSlides);

  const handlePrev = () => {
    if (!swiper) return;
    swiper.slidePrev();
  };

  const handleNext = () => {
    if (!swiper) return;
    swiper.slideNext();
  };

  return (
    <section className="py-57px bg-black">
      <div className="container">
        <div className="mb-57px flex items-center justify-between gap-4">
          <h2 className=" text-4xl xl:text-5xl leading-lh-text68 font-normal text-white">
            {data.title}
          </h2>
          <div className="flex border border-white rounded-full">
            <button
              type="button"
              aria-label="Previous scope"
              onClick={handlePrev}
              disabled={!swiper || (!canLoop && data.items.length <= 1)}
              className="px-3 py-2 md:px-6 md:py-4 xl:py-[12px] border-r border-white rounded-tl-full rounded-bl-full group cursor-pointer hover:bg-accent transition-all duration-300"
            >
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex w-[6px] h-[13px] lg:w-[10px] lg:h-[16px]" >
                <path d="M8.33594 1.33154L1.66731 8.00017L8.33594 14.6688" stroke="#7AC142" className="group-hover:stroke-white transition-all duration-300" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next scope"
              onClick={handleNext}
              disabled={!swiper || (!canLoop && data.items.length <= 1)}
              className="px-3 py-2 md:px-6 md:py-4 xl:py-[12px] rounded-tr-full rounded-br-full cursor-pointer group hover:bg-accent transition-all duration-300"
            >
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex w-[6px] h-[13px] lg:w-[10px] lg:h-[16px]"
              >
                <path d="M1.66406 1.33154L8.33269 8.00017L1.66406 14.6688" stroke="#7AC142" className="group-hover:stroke-white transition-all duration-300" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Swiper
        onSwiper={setSwiper}
        spaceBetween={40}
        loop={canLoop}
        loopAdditionalSlides={canLoop ? Math.min(2, totalItems) : 0}
        allowTouchMove={true}
        simulateTouch={true}
        grabCursor={true}
        watchOverflow={true}
        touchStartPreventDefault={false}
        touchMoveStopPropagation={false}
        speed={800}
        breakpointsBase="window"
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          425: {
            slidesPerView: slidesPerView425,
          },
          768: {
            slidesPerView: slidesPerView768,
          },
          1024: {
            slidesPerView: slidesPerView1024,
          },
          1360: {
            slidesPerView: slidesPerView1280,
          },
        }}
        className="scope-swiper w-full touch-pan-y"
        style={{ touchAction: "pan-y" }}
      >
        {data.items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="px-[15px] md:px-0 border-b border-sm-gray hover:border-primary transition-colors duration-300 flex flex-col h-full justify-between">
              {/* Top: Image */}
              <div className="aspect-[4/3] md:aspect-[5/4] 2xl:aspect-auto 2xl:h-[380px]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  width={500}
                  height={500}
                  draggable={false}
                  sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 28vw, (min-width: 768px) 33vw, 85vw"
                  // loading={index < 6 ? "eager" : "lazy"}
                  fetchPriority={index < 4 ? "high" : "auto"}
                  className="w-full h-full object-cover select-none"
                />
              </div>

              {/* Bottom: Title */}
              <div className="mt-4 xl:mt-[27px] h-[75px]">
                <h3 className="text-[21px] leading-normal text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Scops;
