"use client";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import { useEffect, useRef, useState } from "react";
import { FourthSection } from "./type";

interface SectorSliderProps {
  data: FourthSection;
}
const SectorSlider = ({ data }: SectorSliderProps) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [pressedNav, setPressedNav] = useState<'prev' | 'next' | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || !prevRef.current || !nextRef.current) return;
    if (!swiper.params.navigation || typeof swiper.params.navigation === "boolean") return;

    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();
  }, []);
  return (
    <section className={`wrapper pt-30px pb-37px md:py-37px bg-black dark:bg-light-dark text-white overflow-hidden ${data.hidden ? "hidden" : ""}`}>
      <div className="container">
        <motion.h2
          variants={moveUp(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-4xl 2xl:text-5xl font-normal leading-[1.147058823529412] pb-4 xl:pb-27px"
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
                swiperRef.current = swiper;
                if (!prevRef.current || !nextRef.current) return;
                if (!swiper.params.navigation || typeof swiper.params.navigation === "boolean") return;
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
                setActiveIndex(swiper.realIndex);
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              // spaceBetween={15}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 15 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 2, spaceBetween: 20 },
                1360: { slidesPerView: 3, spaceBetween: 10 },
              }}
            >
              {data.items.map((item, index) => {
                const isEffectivelyHovered = hoveredIndex !== null ? index === hoveredIndex : index === activeIndex;

                return (
                <SwiperSlide
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  // ✅ h-full so the slide fills the swiper height
                  className="border-t-1 border-foreground dark:border-black/20 relative group xl:pr-0 xl:pl-0 h-full"
                >
                  <div className={`absolute -top-1 left-0 w-full h-[6px] bg-accent transition-transform duration-700 ease-in-out z-50 origin-left ${isEffectivelyHovered ? 'scale-x-100' : 'scale-x-0'}`}></div>
                  <motion.div
                    variants={moveUp(0)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    // ✅ Fixed height matched to Header + Image to avoid gaps
                    className="flex flex-col h-[450px] md:h-[480px] xl:h-[550px] overflow-hidden z-40 relative group"
                  >
                    <div className="flex items-center justify-between mb-3 xl:mb-[25px] xl:pl-4 xl:pr-3 pt-6 xl:pt-[37px] group-first:pl-0 transition-all duration-300">
                      <div className="flex items-center gap-4 xl:gap-4">
                        <Image src={item.logo} alt={item.logoAlt} width={200} height={200} className="w-auto h-10 md:h-12 xl:h-15 object-contain" />
                        <h3 className="xl:text-2xl text-xl leading-[1.2] font-normal transition-all duration-300 min-h-[50px] lg:min-h-[77px] flex items-center">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <div className={`md:pl-4 md:pr-3 group-first:pl-0 transition-all duration-500`}>
                      <div className={`grid transition-all duration-500 ease-in-out ${isEffectivelyHovered ? 'grid-rows-[1fr] opacity-100 pb-[23px]' : 'grid-rows-[0fr] opacity-0 pb-0'}`}>
                        <div className="overflow-hidden">
                          <p className={`text-lg font-[300] leading-[1.526315789473684] sector-description relative z-10 dark:text-white/80`}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* ✅ flex-1 makes the image container fill remaining space.
                        When the description expands above it, this container will naturally shrink,
                        keeping the total slide height locked. */}
                    <div className="relative z-20 overflow-hidden transition-all duration-500 group-first:pl-0 flex-1 w-full">
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
                );
              })}
            </Swiper>
            <div className="absolute left-0 right-0 bottom-2/7 xl:bottom-[120px] z-10 flex h-10 w-full translate-y-1/2 items-center justify-between sm:bottom-[140px] md:right-[-20px] lg:-right-10 xl:-right-12 md:left-auto md:top-2/4 md:bottom-auto md:h-[80px] md:w-[80px] xl:h-[94px] xl:w-[94px] md:translate-y-0 md:justify-center md:bg-black rounded-full md:overflow-hidden">
              <button
                ref={prevRef}
                onClick={() => { setPressedNav('prev'); setTimeout(() => setPressedNav(null), 1800); }}
                className={`group flex items-center justify-center cursor-pointer transition-all duration-300 w-10 h-10 rounded-full border border-white/20 md:border-transparent md:w-1/2 md:h-full md:rounded-none md:border-r
                  ${pressedNav === 'prev' ? 'bg-primary text-white' : 'bg-black text-[#7AC142] hover:bg-primary hover:text-white'}`}
              >
                <svg width="15" height="26" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 md:w-[35%] md:h-auto transition-transform duration-300 md:translate-x-[8px] md:group-hover:translate-x-0">
                  <path d="M14 1L2 13L14 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <button
                ref={nextRef}
                onClick={() => { setPressedNav('next'); setTimeout(() => setPressedNav(null), 1800); }}
                className={`group flex items-center justify-center cursor-pointer transition-all duration-300 w-10 h-10 rounded-full border border-white/20 md:border-transparent md:w-1/2 md:h-full md:rounded-none
                  ${pressedNav === 'next' ? 'bg-primary text-white' : 'bg-black text-[#7AC142] hover:bg-primary hover:text-white'}`}
              >
                <svg width="15" height="26" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 md:w-[35%] md:h-auto transition-transform duration-300 md:-translate-x-[8px] md:group-hover:translate-x-0">
                  <path d="M1 1L13 13L1 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
