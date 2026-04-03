"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import Image from "next/image";
import { SecondSectionItemData } from "./type";
// import { Autoplay } from "swiper/modules";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
// import { useState } from "react";
interface ProjectSliderProps {
  data: SecondSectionItemData;
}
const ProjectSlider = ({ data }: ProjectSliderProps) => {
  // const [progress, setProgress] = useState(85);

  const progress = Number(
    (data?.secondSection?.progress || "").replace(/\D/g, "")
  );

  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);


  const { ref, inView } = useInView({
    threshold: 0.9, // 40% visible
    triggerOnce: true, // 👈 animate only once
  });

  useEffect(() => {
    if (inView && !hasAnimated) {
      setAnimatedProgress(progress);
      setHasAnimated(true);
    }
  }, [inView, hasAnimated, progress]);

  useEffect(() => {
    if (animatedProgress === 0) return;

    const start = 0;
    const end = animatedProgress;
    const duration = 2000;
    const startTime = performance.now();

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(t);

      setDisplayProgress(start + (end - start) * eased);

      if (t < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [animatedProgress]);

  useEffect(() => {
    console.log(`${Math.max(0, Math.min(85, displayProgress - 7.5))}%`);

  }, [displayProgress])


  const images = data?.firstSection?.images || [];
  const hasImages = Array.isArray(images) && images.length > 0;

  const renderOverlay = () => (
    <div className="relative md:absolute bottom-0 md:bottom-30px md:right-0 lg:right-30px z-40 p-5 xl:p-30px w-full max-w-full md:max-w-fit xl:max-w-[515px] border dark:border-white/20/36">
      <div className="absolute top-0 left-0 h-1 w-full" />
      <div className="absolute top-0 left-0 w-full h-full bg-black/80 md:bg-white/12 z-20 backdrop-blur-xs"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[#0F0D0D] opacity-[39%] z-20"></div>
      <div className="relative z-50">
        <h3 className="text-lg xl:text-2xl leading-lh-text32 font-normal text-white mb-6 xl:mb-12"> Project Specifications </h3>
        {displayProgress == 100 && <div className="relative mb-5">
          <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden shadow-inner relative">
            <div className="h-full bg-[#7AC142] rounded-full shadow-sm" style={{ width: `${displayProgress}%` }} />
            <div className="absolute inset-0 flex">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="absolute top-0 bottom-0 w-px bg-white opacity-60" style={{ left: `${i * 20}%` }} />
              ))}
            </div>
          </div>
          <div className="absolute -top-12 bg-white border border-gray-200 px-[10px] py-[5.5px] rounded-md shadow-md"
            style={{
              left: `${displayProgress - 15}%`,
              opacity: displayProgress > 0 ? 1 : 0,
            }}
          >
            <div className="text-sm xl:text-lg leading-normal font-semibold text-black">
              {Math.round(displayProgress)}%
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-5 border-r-5 border-t-8 border-l-transparent border-r-transparent border-white"></div>
          </div>
        </div>}
      </div>
      <div className="relative z-50">
        <div className="grid grid-cold-1 md:grid-cols-2 3xl:grid-cols-[auto_1fr] gap-y-5 lg:gap-y-5 xl:gap-y-7">
          {[
            { label: "Client", value: data?.secondSection?.client },
            { label: "Location", value: data?.secondSection?.location?.name },
            { label: "Scope of Work", value: data?.secondSection?.scopeOfWork },
            { label: "Completion Date", value: data?.secondSection?.completionDate },
            { label: "Status", value: data?.secondSection?.status },
          ].map(({ label, value }) => (
            <div key={label} className="border-b border-white/65 pb-3 xl:even:pl-3 3xl:even:pl-10 last:border-0">
              <h3 className="text-base leading-lh-[1.5625] font-light text-white uppercase"> {label} </h3>
              <h4 className="text-base lg:text-lg leading-lh-text19 text-white font-medium"> {value} </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );


  return (
    <section className="py-57px">
      <div className="container">
        <div className="relative h-auto md:h-fit" ref={ref}>
          {hasImages ? (
            <Swiper modules={[Navigation]} spaceBetween={30} slidesPerView={1} loop={false} hashNavigation={true} grabCursor={true} navigation={true} className="project-slider relative h-full" >
              {images.map((image, index) => (
                <SwiperSlide key={index} className="relative md:max-h-[715px]">
                  <Image src={image} width={1000} height={1000} alt="" className="w-full h-[250px] md:h-[400px] xl:h-[550px] 2xl:h-[700px] object-cover" />
                  {/* overlay panel */}
                  {renderOverlay()}
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="relative ">
              {/* placeholder background */}
              <div className="w-full h-[400px] xl:h-[550px] 2xl:h-[700px] bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-2xl">1920 x 1080</span>
              </div>

              {/* same overlay */}
              {renderOverlay()}
            </div>
          )}

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
        </div>
      </div>
    </section>
  );
};

export default ProjectSlider;
