"use client";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import { useRef } from "react";
interface SectorSliderProps {
  data: {
    title: string;
    description: string;
    items: {
      id: number;
      icon: string;
      title: string;
      description: string;
      image: string;
      slug: string;
    }[];
  };
}
const SectorSlider = ({ data }: SectorSliderProps) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="wrapper md:py-57px pt-57px bg-light-white dark:bg-light-dark text-white overflow-hidden">
      <div className="container">
        <motion.h2
          variants={moveUp(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-5xl font-normal leading-[1.147058823529412] pb-4 xl:pb-27px text-black dark:text-white"
        >
          {data.title}
        </motion.h2>
        <motion.h2
          variants={moveUp(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-xl font-light leading-[1.391304347826087] pb-6 xl:pb-47px text-foreground dark:text-white max-w-[80ch]"
        >
          {data.description}
        </motion.h2>
        <div>
          <div className="relative">
            <div className="absolute top-2/4 right-[-10px] xl:top-4/6 xl:-right-12 z-50 w-[50px] h-[50px] xl:w-[94px] xl:h-[94px] bg-black rounded-full flex items-center justify-center gap-4 xl:gap-4">
              {/* Custom Navigation Buttons */}
              <button
                ref={prevRef}
                className="text-accent flex items-center justify-center h-auto w-6 cursor-pointer"
              >
                <svg
                  width="15"
                  height="26"
                  viewBox="0 0 15 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-full"
                >
                  <path
                    d="M14 1L2 13L14 25"
                    stroke="#7AC142"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <button
                ref={nextRef}
                className="text-accent flex items-center justify-center h-auto w-6 cursor-pointer"
              >
                <svg
                  width="15"
                  height="26"
                  viewBox="0 0 15 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-full"
                >
                  <path
                    d="M1 1L13 13L1 25"
                    stroke="#7AC142"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <Swiper
              className="sector-slider"
              slidesPerView={2}
              spaceBetween={0}
              // loop={true}
              modules={[Pagination, Navigation]}
              pagination={false}
              onBeforeInit={(swiper) => {
                // Bind custom navigation elements
                // @ts-expect-error: Swiper expects element or selector string, but we’re assigning a ref
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-expect-error: Swiper expects element or selector string, but we’re assigning a ref
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1280: {
                  slidesPerView: 3,
                },
              }}
            >
              {data.items.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className="xl:pr-0 xl:pl-0" // keep layout padding here
                >
                  {/* Animate border + content inside */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    className="h-full border-t-1 border-r-1 border-smgray relative group md:pl-[15px] pr-[15px] xl:pr-0"
                  >
                    <div className="absolute -top-1 left-0 w-full h-[6px] bg-transparent  group-hover:bg-accent transition-all duration-300 z-50"></div>

                    <div className="flex flex-col justify-between xl:max-h-[35em] overflow-hidden z-40 relative group">
                      <div className="flex xl:pl-4 xl:pr-3 pt-6 xl:pt-[37px] group-first:pl-0 transition-all duration-300">
                        <div className="flex flex-col items-start">
                          <Image
                            src={item.icon}
                            alt={item.title}
                            width={100}
                            height={100}
                            className="w-[98px] h-[100px] object-contain mb-[17px]"
                          />
                          <h3 className="text-xl xl:text-2xl leading-[1.5625] font-normal transition-all duration-300 text-black dark:text-white">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <div className="xl:pl-4 xl:pr-3 group-first:pl-0  xl:opacity-0 xl:h-0 group-hover:xl:h-auto group-hover:xl:opacity-100 transition-all ease-in-out duration-300  ">
                        <p className="text-lg pt-2 font-[300] leading-[1.526315789473684] sector-description relative z-10 text-foreground dark:text-white">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-auto overflow-hidden group-first:pl-0 transition-all duration-300 relative z-20 xl:pt-27px pt-3">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={487}
                          height={403}
                          className="w-full h-full xl:h-[403px] object-cover object-top flex overflow-hidden pl-0 pr-0 xl:pl-[15px] xl:pr-[15px] group-first:pl-0"
                        />
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectorSlider;
