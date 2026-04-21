"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import BtnPrimary from "../common/BtnPrimary";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp, moveLeft } from "../motionVarients";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import Link from "next/link";

interface FeaturedProjectItem {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string;
  thumbnailAlt: string;
  featuredProject: boolean;
  secondSection: {
    client: string;
    projectValue?: string;
    superficie?: string;
    sector?: {
      _id: string;
      name: string;
    };
    location?: {
      _id: string;
      name: string;
    };
  };
}

interface FeaturedProjectsProps {
  data: {
    projects: FeaturedProjectItem[];
  };
}

const   FeaturedProjects = ({ data }: FeaturedProjectsProps) => {
  const featuredProjects = data.projects.filter(
    (project) => project.featuredProject === true
  );

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-light-white dark:bg-light-dark overflow-hidden">
      <div>
        <div className="container" ref={containerRef}>
          <div className="flex justify-between items-center pt-30px pb-5 xl:py-37px border-b border-[#C2C2C2] dark:border-white/20">
            <motion.h2
              className=" text-4xl 2xl:text-5xl font-normal text-black dark:text-white mb-0 leading-[1.147058823529412] lettersp-2"
              variants={moveUp(0)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              Featured Projects
            </motion.h2>
            <div className="flex gap-3 md:gap-5 items-center flex-row-reverse md:flex-row w-fit h-fit justify-between md:w-auto md:justify-start">
              <motion.div
                variants={moveUp(0.5)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="flex border border-foreground dark:border-white/20 rounded-full "
              >
                <div ref={prevRef}
                  className="px-3 py-2 md:px-6 md:py-4 xl:py-[12px] border-r border-foreground dark:border-white/20 rounded-tl-full rounded-bl-full group  cursor-pointer hover:bg-accent  transition-all duration-300"
                >
                  <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex w-[6px] h-[13px] lg:w-[10px] lg:h-[16px]" >
                    <path d="M8.33594 1.33154L1.66731 8.00017L8.33594 14.6688" stroke="#7AC142" className="group-hover:stroke-white transition-all duration-300" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div ref={nextRef} className="px-3 py-2 md:px-6 md:py-4 xl:py-[12px] rounded-tr-full rounded-br-full cursor-pointer group hover:bg-accent dark:hover:bg-secondary transition-all duration-300"
                >
                  <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex w-[6px] h-[13px] lg:w-[10px] lg:h-[16px]" >
                    <path d="M1.66406 1.33154L8.33269 8.00017L1.66406 14.6688" stroke="#7AC142" className="group-hover:stroke-white transition-all duration-300" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </motion.div>
              {/* <motion.div variants={moveUp(1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} >
                <BtnPrimary link={"/projects"} text="Explore Projects" bgtrans={true} />
              </motion.div> */}
            </div>
          </div>
        </div>
        <div className="onside-margin">
          <div className="container">
            <div className="flex xl:flex-row flex-col-reverse">
              <div className="pt-4 pb-6 xl:py-10 xl:w-[31.5%] w-full xl:border-r border-[#C2C2C2] dark:border-white/20">
                <Swiper
                  modules={[Autoplay, Navigation]}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  onInit={(swiper) => {
                    if (typeof swiper.params.navigation === "object") {
                      swiper.params.navigation.prevEl = prevRef.current;
                      swiper.params.navigation.nextEl = nextRef.current;
                    }
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                  autoplay={{ delay: 6500 }}
                  allowTouchMove={false}
                  loop
                  className="w-full h-full "
                >
                  {featuredProjects?.map((slide, index) => (
                    <SwiperSlide key={index}>
                      <div className="">
                        <motion.h3 variants={moveUp(0.4)} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-2xl font-normal mb-5 lg:mb-15 dark:text-white leading-[1.40625] pr-5">
                          <Link href={"/projects/" + slide.slug} className="hover:text-primary transition-all duration-300">
                            {slide.title}
                          </Link>
                        </motion.h3>
                        <div className="w-full pr-10">
                          <motion.div
                            variants={moveUp(0.5)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            className="pb-4 mb-6 border-b border-[#C2C2C2] dark:border-white/20 group"
                          >
                            <p className="text-[#979797] text-base leading-[1.5625] font-light uppercase  dark:text-white/64 group-hover:text-primary transition-all duration-300">
                              Location
                            </p>
                            <p className="text-lg leading-[1.842105263157895] font-light dark:text-white group-hover:translate-x-2 transition-all duration-300">
                              {slide.secondSection.location?.name}
                            </p>
                          </motion.div>
                          <motion.div
                            variants={moveUp(1)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            className="pb-4 mb-6 border-b border-[#C2C2C2] dark:border-white/20 group"
                          >
                            <p className="text-[#979797] text-base leading-[1.5625] font-light uppercase  dark:text-white/64 group-hover:text-primary transition-all duration-300">
                              Client
                            </p>
                            <p className="text-lg leading-[1.842105263157895] font-light dark:text-white group-hover:translate-x-2 transition-all duration-300">
                              {slide.secondSection?.client}
                            </p>
                          </motion.div>
                          {/* <motion.div
                            variants={moveUp(1.5)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            className="pb-4 mb-6 border-b border-[#C2C2C2] group"
                          >
                            <p className="text-[#979797] text-base leading-[1.5625] font-light uppercase  dark:text-white/64 group-hover:text-primary transition-all duration-300">
                              Project Value
                            </p>
                            <p className="text-lg leading-[1.842105263157895] font-light dark:text-white group-hover:translate-x-2 transition-all duration-300">
                              {slide.secondSection?.projectValue}
                            </p>
                          </motion.div> */}
                          {slide.secondSection?.superficie && (
                            <motion.div
                              variants={moveUp(2)}
                              initial="hidden"
                              whileInView="show"
                              viewport={{ once: true, amount: 0.2 }}
                              className="pb-4  group"
                            >
                              <p className="text-[#979797] text-base leading-[1.5625] font-light uppercase  dark:text-white/64 group-hover:text-primary transition-all duration-300">
                                Superficie
                              </p>
                              <p className="text-lg leading-[1.842105263157895] font-light dark:text-white group-hover:translate-x-2 transition-all duration-300">
                                {slide.secondSection?.superficie}
                              </p>
                            </motion.div>
                          )}
                        </div>
                        <div className="mt-0 lg:mt-16">
                          <BtnPrimary
                            link={"/projects/" + slide.slug}
                            text="READ MORE"
                            bgtrans={true}
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <motion.div className="pb-0 pt-4 xl:py-10 xl:ps-10 xl:w-[68.5%] w-full"
                variants={moveLeft(0.5)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <Swiper
                  className="h-full featured-slider min-h-[250px] md:h-[350px] lg:h-full "
                  modules={[Autoplay, Navigation]}
                  autoplay={{ delay: 6500 }}
                  allowTouchMove={false}
                  loop
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  onInit={(swiper) => {
                    if (typeof swiper.params.navigation === "object") {
                      swiper.params.navigation.prevEl = prevRef.current;
                      swiper.params.navigation.nextEl = nextRef.current;
                    }
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                  spaceBetween={20}
                  slidesPerView={1}
                >
                  {featuredProjects.map((slide, index) => (
                    <SwiperSlide key={index} className="h-full min-h-[250px] md:h-full relative overflow-hidden group" >
                      <div className="absolute inset-0 h-full">
                        <Link href={"/projects/" + slide.slug} className="w-full h-full block">
                          <Image src={slide.thumbnail} alt={slide.thumbnailAlt} width={2000} height={2000} className="w-full h-full object-cover hover:scale-105 transition-all duration-300 " />
                        </Link>
                      </div>

                      {/* Padding wrapper to create 30px gap */}
                      <button className="absolute top-[25px] left-[15px] 2xl:top-[40px] 2xl:left-[30px] z-10">
                        <span
                          className="bg-accent text-base font-light leading-[1.75] text-para-color uppercase px-5 xl:px-[25px] py-3 xl:py-[15px] rounded-[75px] group-hover:text-white group-hover:bg-primary transition-all duration-300"
                        >
                          {slide.secondSection?.sector?.name}
                        </span>
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
