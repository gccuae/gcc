"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css"; 
import { Home } from "@/types/Common"; 
 

interface HeroSliderProps {
  data: Home;
}

const HeroSlider = ({ data }: HeroSliderProps) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative">
      <div className="relative w-full overflow-hidden     ">
        <div className="  ">

          <div className="relative w-full  slideroverlay    " style={{ backgroundImage: `url(${data.banners[activeIndex].image})` }} >
            
           <div className="slidermns h-full  container relative pt-[200px]  z-[999]">
           <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 5000 }}
              loop
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="w-full h-full "
            >
              {data.banners.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="  w-full h-full  ">
                    {/* <Image
                  src={slide.image}
                  alt={slide.title}
                  width={290}
                  height={290}
                  className="   inset-0 w-full h-full object-cover   "
                />  */}
                    <div className="">
                      <h1 className="text-white text-6xl font-normal max-w-[20ch] leading-[1.18]">Pioneering Progress with Quality & Expertise</h1>
                      <p className="text-white text-xl font-[300] max-w-[73ch] leading-[1.4] pt-[35px] pb-[35px]">Gulf Contractors Company (GCC) is a subsidiary of Abu Dhabi-based Al Sharafi Group and United Eastern (UE) Group, leading conglomerates with diverse interests across the MENA region.</p>
                      <button className={`flex items-center gap-[12px] px-6 py-[6px] cursor-pointer font-[300] leading-[1.8]  rounded-full transition-all duration-300 text-white    border border-white`}  >READ MORE
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="10" viewBox="0 0 26 10" fill="none">
                          <path d="M0 9.53003H24L15 0.530029" stroke="#7AC142" stroke-width="1.5" stroke-miterlimit="10" />
                        </svg>
                      </button>

                    </div>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Custom Pagination */}
            <div className="absolute bottom-[128px] z-20 w-full">
              <div className="container">
                <div className="flex gap-2 justify-end" >
                  {data.banners.map((_, index: number) => (
                    <div key={index}>
                      {data.banners.length > 1 ? (
                        <button

                          className={`w-[50px] h-[3px] cursor-pointer rounded-full transition-all duration-300 ${activeIndex === index
                            ? "bg-primary scale-125 max-w-[27px]"
                            : "bg-white max-w-[9px]"
                            }`}
                          onClick={() => swiperRef.current?.slideToLoop(index)}
                        > 0{index + 1} </button>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
           </div>
            <div className="container">
            <div className="grid grid-cols-4 pt-8 lg:pt-[76px] relative z-10">
              <div className="text-white text-2xl font-normal">1</div>
              <div className="text-white text-2xl font-normal">2</div>
              <div className="text-white text-2xl font-normal">3</div>
              <div className="text-white text-2xl font-normal">4</div>
            </div>
          </div>
          </div>
          

        </div>

      </div>
    </section>
  );
};

export default HeroSlider;
