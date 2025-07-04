"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css"; 
import { Home } from "@/types/Common"; 
import BtnPrimary from "../common/BtnPrimary";
import Counter from "../common/Counter";
 

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

          <div className="relative w-full  slideroverlay bg-cover bg-center   " style={{ backgroundImage: `url(${data.bannerimage})` }} >
            
           <div className="slidermns h-full  container relative pt-10  md:pt-[50px] lg:pt-[200px]  z-[9]">
           <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 4000 }}  
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
                      <h1 className="text-white text-6xl font-normal max-w-[20ch] leading-[1.18]">{slide.title}</h1>
                      <p className="text-white text-xl font-light max-w-[73ch] leading-[1.4] pt-[35px] pb-[35px]">{slide.subtitle}</p>
                    
                      <BtnPrimary link={slide.btnLink} text={slide.btn} bgtrans={true} borderwight={true} />

                    </div>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Custom Pagination */}
            <div className="md:absolute bottom-[128px] z-20 w-full">
              <div className="container">
                <div className="flex gap-3 md:gap-5   md:flex-col  md:border-r border-[#FFFFFF80] relative right-1 justify-end" style={{alignItems:"flex-end"}}>
                  {data.banners.map((_, index: number) => (
                    <div key={index} className="lead">
                      {data.banners.length > 1 ? (
                        <button

                          className={`mt-8 md:mt-0 text-[14px] leading-[1.8] font-light  relative md:right-[-4px] cursor-pointer px-3 md:px-0 md:pe-[13px]  transition-all duration-300 ${activeIndex === index
                            ? "border-b-[3px] md:border-b-0 md:border-r-[3px] border-accent md:py-3 md:mb-20 text-accent md:text-white"
                            : "md:border-r-[3px] border-[transparent] text-white"
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
            <div className="grid grid-cols-2  lg:grid-cols-4 pt-8 lg:pt-[76px] relative z-10">
              <div className="text-white border border-[#C2C2C2] border-b-0 transition-all duration-300 group hover:bg-primary">
                <div className=" pe-3  ps-3 xl:ps-12 py-5 xl:py-[32px]">
                  <p className="text-2xl md:text-5xl font-normal leading-[.8] mb-4 lg:mb-6 "><Counter from={0} to={35} duration={2} /> <span>+</span></p>
                  
                  <p className="uppercase font-light text-base xl:text-lg">Years of Expertise</p>
                </div>
              </div>
              <div className="text-white border border-[#C2C2C2] border-b-0 pe-3 transition-all duration-300 group hover:bg-primary">
                <div className="  ps-3 xl:ps-12 py-5 xl:py-[32px]">
                  <p className="text-2xl md:text-5xl font-normal leading-[.8] mb-4 lg:mb-6 "><Counter from={0} to={180} duration={2} />M<span></span></p>
                  <p className="uppercase font-light text-base xl:text-lg">Portfolio Value</p>
                </div>
              </div>
              <div className="text-white border border-[#C2C2C2] border-b-0 pe-3 transition-all duration-300 group hover:bg-primary">
                <div className="  ps-3 xl:ps-12 py-5 xl:py-[32px]">
                  <p className="text-2xl md:text-5xl font-normal leading-[.8] mb-4 lg:mb-6 "><Counter from={0} to={750} duration={2} /><span>+</span></p>
                  <p className="uppercase font-light text-base xl:text-lg">Projects Completed</p>
                </div>
              </div>
              <div className="text-white border border-[#C2C2C2] border-b-0 pe-3 transition-all duration-300 group hover:bg-primary">
                <div className="  ps-3 xl:ps-12 py-5 xl:py-[32px]">
                  <p className="text-2xl md:text-5xl font-normal leading-[.8] mb-4 lg:mb-6 "><Counter from={0} to={5000} duration={2} /><span>+</span></p>
                  <p className="uppercase font-light text-base xl:text-lg">Dedicated Manpower </p> 
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSlider;
