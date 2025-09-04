"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import Image from "next/image";
import { projectDetailsData } from "./data";
// import { Autoplay } from "swiper/modules";
import { Navigation } from "swiper/modules";
// import { useState } from "react";
const ProjectSlider = () => {
  // const [progress, setProgress] = useState(85);
  const progress = projectDetailsData.projectData.completionRange;
  return (
    <section className="py-57px">
      <div className="container">
        <div className="relative">
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
            className="project-slider"
          >
            {projectDetailsData.projectData.gallery.map((image, index) => (
              <SwiperSlide key={index}>
                <Image src={image} width={1000} height={1000} alt="" className="w-full h-full object-cover" />
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
          <div className="absolute bottom-30px right-30px z-40 p-5 xl:p-30px max-w-fit xl:max-w-[515px] border border-smgray/36">
            <div className="absolute top-0 left-0 w-full h-full bg-white/12 z-20 backdrop-blur-xs"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[#0F0D0D] opacity-[39%] z-20"></div>
            <div className="relative z-50">
              <h3 className="text-2xl leading-lh-text32 font-normal text-white mb-12">Project Specifications</h3>
              {/* Main Range Component */}
              <div className="relative mb-5">
                {/* Progress Bar Container */}
                <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden shadow-inner relative">
                  {/* Progress Fill */}
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-300 ease-out shadow-sm"
                    style={{ width: `${progress}%` }}
                  />

                  {/* Partition Lines - 5 sectors means 4 divider lines */}
                  <div className="absolute inset-0 flex">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="absolute top-0 bottom-0 w-px bg-white opacity-60" style={{ left: `${(i * 20)}%` }} />
                    ))}
                  </div>
                </div>

                {/* Percentage Indicator */}
                <div
                  className="absolute -top-12 bg-white border border-gray-200 px-[10px] py-[5.5px] rounded-md shadow-md transition-all duration-300 ease-out"
                  style={{
                    left: `${Math.max(0, Math.min(85, progress - 7.5))}%`,
                    opacity: progress > 0 ? 1 : 0
                  }}
                >
                  <div className="text-sm xl:text-lg leading-normal font-semibold text-black ">
                    {progress}%
                  </div>
                  {/* Arrow pointing down */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-5 border-r-5 border-t-8 border-l-transparent border-r-transparent border-white"></div>
                </div>
              </div>
            </div>
            <div className="relative z-50">
              <div className="grid grid-cols-[auto_1fr] gap-y-7">
                {Object.entries(projectDetailsData.projectData.specifications).map(([key, value]) => (
                  <div key={key} className="border-b border-white/65 pb-3 xl:even:pl-4">
                    <h3 className="text-base leading-lh-[1.5625] font-light text-white uppercase">{key}</h3>
                    <h4 className="text-lg leading-lh-text19 text-white font-medium">
                      {Array.isArray(value) ? value.join(", ") : value}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectSlider;