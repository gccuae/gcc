"use client";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import { useRef } from "react";
import { FourthSection } from "./type";

interface SectorSliderProps {
  data: FourthSection;
}
const SectorSlider = ({ data }: SectorSliderProps) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <section className="wrapper pt-30px pb-37px md:py-37px bg-black dark:bg-light-dark text-white overflow-hidden">
      <div className="container">
        <motion.h2
          variants={moveUp(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-4xl xl:text-5xl font-normal leading-[1.147058823529412] pb-4 xl:pb-27px"
        >
          {data.title}
        </motion.h2>
        <div>
          {/* ✅ Fixed height on mobile so all slides are uniform; auto on md+ */}
          <div className="relative h-[480px] sm:h-[520px] md:h-auto">
            <Swiper
              className="sector-slider h-full" // ✅ fill the fixed height
              slidesPerView={2}
              spaceBetween={0}
              loop={true}
              modules={[Pagination, Navigation, Autoplay]}
              pagination={false}
              onBeforeInit={(swiper) => {
                // @ts-expect-error
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-expect-error
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              onSwiper={(swiper) => {
                if (!prevRef.current || !nextRef.current) return;
                if (!swiper.params.navigation || typeof swiper.params.navigation === "boolean") return;
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              autoplay={{ delay: 5000 }}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2 },
                1360: { slidesPerView: 3 },
              }}
            >
              {data.items.map((item, index) => (
                <SwiperSlide
                  key={index}
                  // ✅ h-full so the slide fills the swiper height
                  className="border-t-1 md:border-r-1 border-foreground dark:border-black/20 relative group  xl:pr-0 xl:pl-0 h-full"
                >
                  <div className="absolute -top-1 left-0 w-full h-0 group-hover:h-[6px] bg-accent transition-all duration-300 z-50"></div>
                  <motion.div
                    variants={moveUp(index * 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    // ✅ h-full so the flex column stretches the full slide height
                    className="flex flex-col justify-between xl:max-h-[35em] overflow-hidden z-40 relative group h-full"
                  >
                    <div className="flex items-center justify-between mb-3 xl:mb-[25px] xl:pl-4 xl:pr-3 pt-6 xl:pt-[37px] group-first:pl-0 transition-all duration-300">
                      <div className="flex items-center gap-2 xl:gap-4">
                        <Image
                          src={item.logo}
                          alt={item.logoAlt}
                          width={200}
                          height={200}
                          className="w-auto h-15 object-contain"
                        />
                        <h3 className="xl:text-2xl text-xl leading-[1.2] font-normal transition-all duration-300 min-h-[50px] lg:min-h-[77px] flex items-center">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <div className="xl:pl-4 xl:pr-3 3xl:pt-6 group-hover:3xl:pt-[35px] group-first:pl-0 transition-all duration-300">
                      <p className="text-lg font-[300] leading-[1.526315789473684] pb-5 xl:pb-0 xl:opacity-0 xl:h-0 group-hover:xl:h-auto group-hover:xl:opacity-100 transition-all ease-in-out duration-300 group-hover:xl:pb-[23px] sector-description relative z-10 dark:text-white/80">
                        {item.description}
                      </p>
                    </div>
                    {/* ✅ flex-1 on mobile makes image grow to fill leftover height,
                        keeping total slide height locked. md+ reverts to explicit heights. */}
                    <div className="relative z-20 mt-auto overflow-hidden transition-all duration-300 group-first:pl-0 flex-1 md:flex-none md:h-[320px] xl:h-[400px]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={600}
                        height={600}
                        className="flex h-full w-full object-cover object-top overflow-hidden pl-0 pr-0 xl:pl-[15px] xl:pr-[15px] group-first:pl-0"
                      />
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="absolute left-0 right-0 bottom-2/7 xl:bottom-[120px] z-50 flex h-10 w-full translate-y-1/2 items-center justify-between gap-4 sm:bottom-[140px] md:right-[-10px] md:left-auto md:top-2/4 md:bottom-auto md:h-[50px] md:w-[50px] md:translate-y-0 md:justify-center md:bg-black xl:top-4/6 xl:-right-12 xl:h-[94px] xl:w-[94px] rounded-full xl:gap-6">
              <button ref={prevRef} className="text-accent w-10 h-10 md:w-2 xl:w-[12px] md:h-auto bg-black border border-white/20 md:border-0 md:bg-transparent rounded-full flex items-center justify-center">
                <svg width="15" height="26" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-full md:h-full">
                  <path d="M14 1L2 13L14 25" stroke="#7AC142" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <button ref={nextRef} className="text-accent w-10 h-10 md:w-2 xl:w-[12px] md:h-auto bg-black border border-white/20 md:border-0 md:bg-transparent rounded-full flex items-center justify-center">
                <svg width="15" height="26" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-full md:h-full">
                  <path d="M1 1L13 13L1 25" stroke="#7AC142" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectorSlider;
