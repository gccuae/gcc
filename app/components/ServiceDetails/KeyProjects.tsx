"use client";

import { Autoplay } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { serviceDetailsData } from "./data";
import { useRef, useState } from "react";

// Import required Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import Link from "next/link";
import { assets } from "@/public/assets/assets";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import { SingleProject } from "../expertise/type";

interface KeyProjectsProps {
  projects: SingleProject[];
}

const KeyProjects = ({ projects }: KeyProjectsProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);

  const handlePrevClick = () => {
    console.log("activeIndex", activeIndex);
    console.log("Prev clicked, swiper ref:", swiperRef.current);
    if (swiperRef.current) {
      console.log(
        "Current slide index before prev:",
        swiperRef.current.realIndex
      );
      swiperRef.current.slidePrev();
      setTimeout(() => {
        console.log(
          "Current slide index after prev:",
          swiperRef.current?.realIndex
        );
      }, 100);
    }
  };

  const handleNextClick = () => {
    console.log("Next clicked, swiper ref:", swiperRef.current);
    if (swiperRef.current) {
      console.log(
        "Current slide index before next:",
        swiperRef.current.realIndex
      );
      swiperRef.current.slideNext();
      setTimeout(() => {
        console.log(
          "Current slide index after next:",
          swiperRef.current?.realIndex
        );
      }, 100);
    }
  };

  return (
    <section className="py-57px pb-14 xl:pb-25 bg-light-white dark:bg-light-dark max-w-[1920px] mx-auto">
      <div className="container">
        <div className="mb-57px flex items-center justify-between">
          <motion.h2
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-5xl leading-lh-text68 font-normal text-black dark:text-white"
          >
            {" "}
            Key Projects{" "}
          </motion.h2>
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex border border-foreground dark:border-white rounded-full"
          >
            <div
              onClick={handlePrevClick}
              className="px-3 py-2 md:px-6 md:py-4 xl:py-[12px] border-r border-foreground dark:border-white rounded-tl-full rounded-bl-full group cursor-pointer hover:bg-accent transition-all duration-300"
            >
              <svg
                width="10"
                height="16"
                viewBox="0 0 10 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex w-[6px] h-[13px] lg:w-[10px] lg:h-[16px]"
              >
                <path
                  d="M8.33594 1.33154L1.66731 8.00017L8.33594 14.6688"
                  stroke="#7AC142"
                  className="group-hover:stroke-white transition-all duration-300"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div
              onClick={handleNextClick}
              className="px-3 py-2 md:px-6 md:py-4 xl:py-[12px] rounded-tr-full rounded-br-full cursor-pointer group hover:bg-accent dark:hover:bg-white transition-all duration-300"
            >
              <svg
                width="10"
                height="16"
                viewBox="0 0 10 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex w-[6px] h-[13px] lg:w-[10px] lg:h-[16px]"
              >
                <path
                  d="M1.66406 1.33154L8.33269 8.00017L1.66406 14.6688"
                  stroke="#7AC142"
                  className="group-hover:stroke-white transition-all duration-300"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      <Swiper
        className="w-full key-projects-swiper"
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        onSwiper={(swiper) => {
          console.log("Swiper initialized:", swiper);
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          console.log("Slide changed to:", swiper.realIndex);
          setActiveIndex(swiper.realIndex);
          swiperRef.current = swiper;
        }}
        direction="horizontal"
        resistance
        // resistanceRatio={0.5}
        slidesPerGroup={1}
        speed={1500}
        loop={true}
        centeredSlides={true}
        // slidesPerView="auto"
        spaceBetween={15}
        grabCursor
        breakpoints={{
          425: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2.1, spaceBetween: 40 },
        }}
      >
        {projects.map((item, index) => (
          <SwiperSlide
            key={index}
            className="!overflow-hidden !p-[15px] md:!p-[0px]"
            // onMouseEnter={() => {
            //   swiperRef.current?.slideToLoop(index); // move hovered slide to center
            // }}
          >
            <motion.div
              variants={moveUp(index * 0.15)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative h-[250px] lg:h-[350px] xl:h-[450px] 2xl:h-[533px] 3xl:h-[633px] w-full lg:w-[700px] 2xl:w-[1003px] flex flex-col justify-end px-6 py-6 xl:py-8 group"
              onClick={() =>
                setActiveOverlay(activeOverlay === item._id ? null : item._id)
              }
            >
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={600}
                height={400}
                className="w-full h-full object-cover absolute inset-0 z-0"
              />

              <div
                className={`
      relative z-10 transition-all duration-300 content-box
      ${activeOverlay === item._id ? "opacity-100" : "opacity-0"}
      lg:group-hover:opacity-100
    `}
              >
                <div className="bg-black w-fit p-2 lg:px-5 lg:py-3">
                  <p className="text-lg leading-lh-text19 font-normal text-white">
                    {item.secondSection.projectType.name},{" "}
                    {item.secondSection.sector.name},{" "}
                    {item.secondSection.location.name}
                  </p>
                </div>
                <div className="bg-light-white w-fit p-2 lg:p-4 min-w-[50%] flex items-center justify-between gap-4 group">
                  <h3 className="text-xl lg:text-2xl leading-normal font-normal text-black">
                    {item.title}
                  </h3>
                  <Link
                    href={"#"}
                    className="bg-black w-10 h-10 xl:w-15 xl:h-15 rounded-full flex items-center justify-center"
                  >
                    <Image
                      src={assets.linkArrowGreen}
                      alt="arrow-right"
                      width={20}
                      height={20}
                      className="w-5 h-5 xl:w-[19px] xl:h-[19.05px] lg:-translate-x-2 lg:translate-y-2 transition-all duration-300 group-hover:translate-y-0 group-hover:-translate-x-0"
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-pagination w-full">
        <div className="flex justify-center items-center gap-2 mt-6 w-fit mx-auto">
          {serviceDetailsData.keyProjects.items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => swiperRef.current?.slideToLoop(idx)}
              className={`w-3 h-[3px] rounded-full transition ${
                swiperRef.current?.realIndex === idx
                  ? "bg-accent w-[27px]"
                  : "bg-mdgray"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyProjects;
