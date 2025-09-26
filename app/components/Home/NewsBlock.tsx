"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { StaticImageData } from "next/image";
import BtnPrimary from "../common/BtnPrimary";
import { motion } from "framer-motion";
import { fadeIn, moveUp } from "../motionVarients";
import { useEffect, useRef } from "react";
import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

interface NewsBlockProps {
  title: string;
  link: string;
  items: {
    title: string;
    description: string;
    image: string | StaticImageData;
    link: string;
    date: string;
    category: string;
  }[];
}
const NewsBlock = ({ title, link, items }: NewsBlockProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const overlay = sectionRef.current.querySelector(".reveal-overlay");

    gsap.set(overlay, { xPercent: 0 }); // start covering
    gsap.to(overlay, {
      xPercent: 100, // slide out to the right
      duration: 2.7,
      ease: "expo.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 130%", // when section comes into view
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <section
      className="py-37px bg-light-white dark:bg-black relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="reveal-overlay absolute inset-0 bg-white z-20"></div>
      <div className="container">
        <div className="flex justify-between items-center pb-27px mb-37px border-b border-smgray">
          <motion.h2
            variants={moveUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="text-5xl font-normal leading-[1.147058823529412] text-black dark:text-white hover:text-primary transition-colors duration-300"
          >
            {title}
          </motion.h2>
          <BtnPrimary link={link} text="View All" bgtrans={true} />
        </div>
        <div>
          <Swiper
            className="w-full home-news-swiper !pb-10"
            slidesPerView={1}
            spaceBetween={20}
            modules={[Pagination]}
            pagination={{ clickable: true }}
          >
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-wrap lg:flex-nowrap items-stretch gap-4 lg:gap-[69px] ">
                  <motion.div
                    variants={fadeIn(0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="xl:w-1/2 overflow-hidden flex items-stretch w-full"
                  >
                    <Image
                      src={item.image}
                      alt="newsBlockImage"
                      width={2000}
                      height={2000}
                      className="w-full h-[350px] md:h-full object-cover hover:scale-110 transition-all duration-400"
                    />
                  </motion.div>
                  <div className="xl:w-1/2 group">
                    <motion.div
                      variants={moveUp(0.2)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.2 }}
                      className="flex items-center justify-between mb-3 xl:mb-[28px]"
                    >
                      <button className="bg-accent px-5 py-2 transition-all duration-300 uppercase ">
                        <span className="text-foreground group-hover:text-white transition-all duration-300">
                          {item.category}
                        </span>
                      </button>
                      <p className="text-base font-light text-forground underline underline-offset-10 dark:text-white hover:text-black dark:hover:text-white transition-all duration-300">
                        {item.date}
                      </p>
                    </motion.div>
                    <motion.h3
                      variants={moveUp(0.2)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.2 }}
                      className="text-2xl font-normal leading-[1.40625] text-forground mb-3 xl:mb-[22px] dark:text-white hover:text-primary transition-colors duration-300"
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p
                      variants={moveUp(0.4)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.2 }}
                      className="text-lg leading-[1.526315789473684] font-light text-forground dark:text-white/80 hover:text-black dark:hover:text-white transition-colors duration-300"
                    >
                      {item.description}
                    </motion.p>
                    <motion.div
                      variants={moveUp(0.6)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.2 }}
                      className="mt-4 xl:mt-[53px]"
                    >
                      <BtnPrimary
                        link={item.link}
                        text="Read More"
                        bgtrans={true}
                      />
                    </motion.div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default NewsBlock;
