"use client"
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import BtnPrimary from "../common/BtnPrimary";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp, moveLeft } from "../../components/motionVarients";
import { TypeFeaturedProjects } from "@/types/Common";
interface FeaturedProjectsProps {
  data: TypeFeaturedProjects;
}

const FeaturedProjects = ({ data }: FeaturedProjectsProps) => {

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [rightMargin, setRightMargin] = useState(0);

  useEffect(() => {
    const updateMargin = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const windowWidth = window.innerWidth;
        const margin = (windowWidth - containerWidth) / 2;
        setRightMargin(margin);
      }
    };

    updateMargin();
    window.addEventListener("resize", updateMargin);
    return () => window.removeEventListener("resize", updateMargin);
  }, []);

  return (
    <section className="bg-[#F5F3F0]">
      <div >
        <div className="container" ref={containerRef}>
          <div className="md:flex justify-between items-center py-8 md:pt-[53px] md:pb-[57px] border-b border-[#C2C2C2]">
            <motion.h2 className="text-5xl font-normal text-black mb-8 md:mb-0" variants={moveUp(0)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>{data.title}</motion.h2>
            <div className="flex gap-3 md:gap-5 items-center  ">
              <motion.div variants={moveUp(0.5)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="flex border border-foreground rounded-full ">
                <div ref={prevRef}
                  className="px-4 py-3 md:px-6 md:py-4 border-r border-foreground rounded-tl-full rounded-bl-full group  cursor-pointer hover:bg-accent  transition-all duration-300">
                  <Image src="/assets/img/icons/greenrightarrow.svg" alt="image" className="rotate-180 group-hover:brightness-0 group-hover:invert transition-all duration-300 min-w-[6px] min-h-[13px]" width={6} height={13} />
                </div>
                <div ref={nextRef}
                  className="px-4 py-3 md:px-6 md:py-4 rounded-tr-full rounded-br-full cursor-pointer group hover:bg-accent transition-all duration-300">
                  <Image src="/assets/img/icons/greenrightarrow.svg" alt="image" className="group-hover:brightness-0 group-hover:invert transition-all duration-300 min-w-[6px] min-h-[13px]" width={6} height={13} />
                </div>
              </motion.div>
              <motion.div variants={moveUp(1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                <BtnPrimary link={'#'} text="Explore Projects" bgtrans={false} />
              </motion.div>
            </div>
          </div>
        </div>
        <div className="onside-margin px-4" style={{ marginLeft: `${rightMargin}px` }}>
          <div className="flex md:flex-row flex-col-reverse">
            <div className="py-8 md:py-10 md:w-[31.5%] w-full md:border-r border-[#C2C2C2]">
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

                // autoplay={{ delay: 4000 }}  
                loop

                className="w-full h-full "
              >
                {data.banners.map((slide, index) => (
                  <SwiperSlide key={index} >
                    <div>
                      <h3 className="text-2xl font-normal mb-5 lg:mb-15">{slide.title}</h3>
                      <div className="w-full lg:w-[80%]">
                        <motion.div variants={moveUp(0.5)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="pb-4 mb-6 border-b border-[#C2C2C2]">
                          <p className="text-[#979797] text-base font-light uppercase">Location</p>
                          <p className="text-lg font-light">{slide.location}</p>
                        </motion.div>
                        <motion.div variants={moveUp(1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="pb-4 mb-6 border-b border-[#C2C2C2]">
                          <p className="text-[#979797] text-base font-light uppercase">Client</p>
                          <p className="text-lg font-light">{slide.client}</p>
                        </motion.div>
                        <motion.div variants={moveUp(1.5)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="pb-4 mb-6 border-b border-[#C2C2C2]">
                          <p className="text-[#979797] text-base font-light uppercase">Project Value</p>
                          <p className="text-lg font-light">{slide.projectvalue}</p>
                        </motion.div>
                        <motion.div variants={moveUp(2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="pb-4  ">
                          <p className="text-[#979797] text-base font-light uppercase">Superficie</p>
                          <p className="text-lg font-light">{slide.superficie}</p>
                        </motion.div>
                      </div>
                      <div className="mt-8 lg:mt-16">
                        <BtnPrimary link={'#'} text={slide.btn} bgtrans={false} />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}


              </Swiper>

            </div>
            <motion.div className="pb-0 pt-10 md:py-10 md:ps-10 md:w-[68.5%] w-full" variants={moveLeft(0.5)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              <Swiper
                modules={[Autoplay, Navigation]}
                // autoplay={{ delay: 4000 }}  
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
                spaceBetween={40}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                  },
                  640: {
                    slidesPerView: 1,

                    spaceBetween: 10
                  },
                  768: {
                    slidesPerView: 1.2,
                    spaceBetween: 30
                  },
                  1524: {
                    slidesPerView: 1.2,
                    spaceBetween: 40
                  },

                }}
                className="w-full h-full "
              >
                {data.banners.map((slide, index) => (
                  <SwiperSlide key={index} >
                    <div className="h-full">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        width={290}
                        height={290}
                        className="   inset-0 w-full h-full object-cover   "
                      />
                    </div>
                  </SwiperSlide>
                ))}


              </Swiper>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default FeaturedProjects;